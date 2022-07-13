<template >
  <div class="signature">
    <div class="signature-content">
      <div class="sign_bg sign_bg-content"
           :class="{'screen-full': isFullScreen}">
        <canvas id="canvas"></canvas>
        <div class="icon icon-finish">
          <el-button v-if="isFullScreen"
                     @click.stop="clear()">清除</el-button>
          <el-button v-if="isFullScreen"
                     @click.stop="operate()">取消</el-button>
          <el-button type="primary"
                     v-if="isFullScreen"
                     @click.stop="operate()">完成</el-button>
        </div>
      </div>
      <div class="sign_bg sign_bg-show"
           @click="operate()">
        <img v-if="signUrl"
             id="signImg"
             class="signImg"
             width="auto"
             height="185px%"
             :src="signUrl"
             alt="点击进入全屏"
             @click.stop="operate()" />
        <span class="tips-text"
              v-if="!signUrl"
              @click.stop="operate()">点击进入全屏签名</span>
      </div>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'
export default {
  data () {
    return {
      // 签名url
      signUrl: '',
      // 是否时全屏
      isFullScreen: false,
      // 签名对象
      signaturePad: '',
      // 屏幕宽度
      canvasWidth: window.innerWidth,
      // 屏幕高度
      canvasHeight: window.innerHeight,
      // canvas对象
      canvas: '',
      isAndroid: false,
      isIos: false
    }
  },
  mounted () {
    const canvas = document.querySelector('#canvas')
    console.log(canvas, 'dd');
    this.canvas = canvas
    canvas.width = window.innerWidth
    canvas.height = 300
    this.signaturePad = new SignaturePad(canvas, {
      penColor: 'rgb(0, 0, 0)', // 笔的颜色
      backgroundColor: 'rgb(90, 155, 248)'
    })
    this.$nextTick(() => {
      // 检测客户端类型
      this.getClientType()
    })
  },
  methods: {
    /**
    * 获取图片宽度
    */
    getImageWidth () {
      // 获取图片宽度，为设备宽度减去边距50
      return window.innerWidth - 50
    },
    /**
       * 设置客户端类型
       */
    getClientType () {
      const u = window.navigator.userAgent
      // 安卓
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      // ios
      this.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    /**
    * 获取图片大小
    */
    getSize (url) {
      return new Promise((resolve) => {
        const img = document.createElement('img')
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.src = url
      })
    },
    /**
 * 全屏和退出全屏操作
 */
    async operate () {
      console.log('entry');
      const type = this.isFullScreen ? 'out' : 'enter'
      switch (type) {
        case 'enter':
          // 进入全屏
          this.isFullScreen = true
          // 滚动条至页面顶部
          window.document.body.scrollTop = 0
          // 非空，则不重新加载画布
          if (!this.isEmptyPad()) {
            // 旋转画布-还原
            this.roatePic(this.canvasWidth, this.canvasHeight, 90)
            return
          }
          // 初始化画布
          if (SignaturePad) {
            const canvas = document.getElementById('canvas')
            this.canvas = canvas
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            this.signaturePad = new SignaturePad(canvas, {
              penColor: 'rgb(0, 0, 0)', // 笔的颜色
              backgroundColor: 'rgb(251, 250, 251)'
            })
          }
          break
        case 'out':
          // 非空
          if (!this.isEmptyPad()) {
            // 等待图片加载完毕
            this.signUrl = this.isEmptyPad()
              ? '' : this.signaturePad.toDataURL()
            // 同步生成图片
            await this.getSize(this.signUrl)
            // 旋转画布-横屏
            this.roatePic(this.canvasHeight, this.canvasWidth, -90)
          }
          // 保存当前图片信息,放置页面路径上,用于展示
          this.signUrl = this.isEmptyPad()
            ? '' : this.signaturePad.toDataURL()
          // 退出全屏
          this.isFullScreen = false
          break
      }
    },
    /**
    * 旋转图片
    */
    roatePic (width, height, degree) {
      const d = (degree * Math.PI) / 180
      const rotationCanvas = this.canvas
      const surfaceContext = this.canvas.getContext('2d')
      const image = document.getElementById('signImg')
      rotationCanvas.width = width
      rotationCanvas.height = height
      // 清除一个画布上的矩形
      surfaceContext.clearRect(0, 0, width, height)
      // 保存状态
      surfaceContext.save()
      // 设置矩形为横屏的中心的位置
      surfaceContext.translate(width * 0.5, height * 0.5)
      // 旋转角度；进度全屏后是90度，具体配置值需要(degree * Math.PI) / 180计算
      surfaceContext.rotate(d)
      // 向画布上绘制图像
      surfaceContext.drawImage(image, -height / 2, -width / 2)
      // 返回之前保存过的路径状态和属性
      surfaceContext.restore()
    },
    /**
     * 上传图片
     */
    dataURLtoBlob (dataUrl) {
      const arr = _.split(dataUrl, ',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = window.atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    /**
     * 上传图片
     */
    async uploadPic (dataUrl) {
      // TODO 因为上传图片时间较长，此处需要加入loading页面
      // 生成二进制图像数据
      const blobdata = this.dataURLtoBlob(dataUrl)
      const imageInfo = new window.FormData()
      // 拼接form表单的参数
      imageInfo.append('elecSign', blobdata, 'filename')
      // 执行图像上传
      const signPicInfo = await this.$api.upload('elecSign', imageInfo)
      // 生成签名需要的参数
      this.signInfo = _.assign({}, {
        url: _.get(signPicInfo, 'url'),
        name: _.get(signPicInfo, 'name')
      })
    },
    /**
     * 保存签名
     */
    async saveSign () {
      const data = await this.$api.put('myapi/user/updateUser/elecSign', this.signInfo)
      if (data) {

      }
      // 拉起客户端的方法，通知是否退出此界面
      this.toClientData(!!data)
    },
    /**
     * 取消签名
     */
    cancel () {
      this.isFullScreen = false
    },
    /**
     * 清除签名
     */
    clear () {
      if (!this.isFullScreen) {
        if (this.isEmptyPad()) {
          return
        }
      }
      // 清空图片URL
      this.signUrl = ''
      // 清空canvas的数据
      this.signaturePad.clear()
    },
    /**
     * 签名是否为空
     */
    isEmptyPad () {
      if (this.signaturePad) {
        return this.signaturePad.isEmpty()
      }
      return true
    },
    /**
     * 提交签名
     */
    async submit () {
      // 未勾选协议提示
      if (!this.agreementChecked) {

        return
      }
      // 获取图像信息，base64 png格式
      // const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      // 未签名提示
      if (this.isEmptyPad()) {
        this.$toast({
          position: 'bottom',
          message: '请签名'
        })
        return
      }
      const data = this.signaturePad ? this.signaturePad.toDataURL() : ''
      if (data) {
        // 上传图片
        await this.uploadPic(data)
        // 保存签名
        await this.saveSign()
      }
    },
    /**
     * 通知客户端签名成功
     */
    toClientData (status) {
      // 获取浏览器agent
      const userAgent = window.navigator.userAgent
      if (!_.includes(userAgent, 'dongrui')) {
        return
      }
      if (this.isAndroid) {
        window.dongruijsBridge.toClientSignFlag(status)
        return
      }
      window.webkit.messageHandlers.toClientSignFlag.postMessage(status)
    },
    /**
     * 跳转合同地址
     */
    jumpTo (ev) {
      this.$router.push({
        path: '/contract',
        query: {
          token: this.token
        }
      })
      return false
    }
  }

}
</script>

<style scoped>
.signature {
  width: 100%;
  height: 225;
  padding: 10px;
}
.agreement-text {
  margin-top: 10px;
  margin-bottom: 40px;
}

.signature-content {
  background-color: #fbf9fc;
  margin-bottom: 25px;
  padding: 25px 15px 10px;
  border-radius: 5px;
}

.sign_bg {
  height: 185px;
  background-size: 100%;
  margin-bottom: 10px;
  position: relative;
}
.sign_bg-content {
  margin-top: 0px;
  opacity: 0;
}
.sign_bg-show {
  margin-top: -200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#canvas {
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
}

.screen-full {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: 99;
  opacity: 1;
}

.title-orientation {
  transform: rotate(90deg);
  position: absolute;
  right: -60px;
  top: 50%;
  margin-top: -12px;
  opacity: 0.8;
}

.icon {
  display: flex;
  position: absolute;
  transform: rotate(90deg);
}
.icon-clear {
  bottom: 100px;
  left: 10px;
}
.icon-finish {
  bottom: 105px;
  left: -60px;
}
.tips-text {
  color: #d0d0d0;
  font-size: 18px;
}
.signImg {
  width: 100%;
  height: 100%;
}
</style>