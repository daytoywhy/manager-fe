<template>
  <el-dialog v-model="dialogVisible"
             title="创建菜单"
             width="600px"
             :destroy-on-close="true"
             draggable>
    <el-form ref="formRef"
             :rules="addRule"
             label-width="100px"
             :model="addForm">
      <el-form-item label="父级菜单"
                    prop="parentMenu">
        <el-cascader v-model="addForm.parentMenu"
                     placeholder="请选择父级菜单"
                     :options="menuData"
                     :props="{checkStrictly:true,label:'menuName',value:'_id'}"
                     clearable>
        </el-cascader>
        <span style="margin-left:10px">不选，则直接创建一级菜单</span>
      </el-form-item>
      <el-form-item label="菜单类型"
                    prop="menuType">
        <el-radio-group v-model="addForm.menuType">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称"
                    prop="menuName">
        <el-input v-model="addForm.menuName"
                  placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单图标"
                    prop="icon">
        <el-input v-model="addForm.icon"
                  placeholder="请输入岗位"></el-input>
      </el-form-item>
      <el-form-item label="路由地址"
                    prop="routerAddress">
        <el-input v-model="addForm.routerAddress"
                  placeholder="请输入路由地址"></el-input>
      </el-form-item>
      <el-form-item label="组件路径"
                    prop="routePath">
        <el-input v-model="addForm.routePath"
                  placeholder="请输入组件路径"></el-input>
      </el-form-item>
      <el-form-item label="菜单状态"
                    prop="menuState">
        <el-radio-group v-model="addForm.menuState">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary"
                   @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
export default {
  props: {
    menuData: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const { ctx } = getCurrentInstance()
    const dialogVisible = ref(false)
    const menuType = ref(1)
    const menuState = ref(1)
    const addForm = reactive({})
    const addRule = reactive({
      menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    })
    const show = () => {
      dialogVisible.value = true
    }
    const cancel = () => {
      dialogVisible.value = false
      ctx.$refs.formRef.resetFields()
    }
    const confirm = () => {
      ctx.$refs.formRef.validate(valid => {
        if (valid) {

        }
      })
    }
    return {
      dialogVisible,
      addForm,
      addRule,
      menuType,
      menuState,
      show,
      cancel,
      confirm
    }
  }
}
</script>

<style>
</style>