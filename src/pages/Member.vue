<template>
  <div class="member">
    <!--搜索-->
    <div class="search">
      <form action="/">
        <van-search
            v-model="searchModel"
            show-action
            placeholder="请输入搜索关键词"
            @search="onRefresh"
            @cancel="onCancel"
        />
      </form>
    </div>
    <!--新增成员-->
    <div class="add-dialog">
      <van-dialog :show="addDialogShow" title="编辑成员" show-cancel-button
                  @confirm = "addDialogConfirm"
                  @cancel="addDialogShow = false">
        <van-field
            v-model="addMemberModel.name"
            name="名称"
            label="名称"
            placeholder="名称"
            :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
            v-model="addMemberModel.position"
            name="职务"
            label="职务"
            placeholder="职务"
            :rules="[{ required: true, message: '请填写职务' }]"
        />
        <van-field
            v-model="addMemberModel.occupation_name"
            name="picker"
            label="职业"
            placeholder="点击选择职业"
            @click="addMemberShowPicker = true"
        />
        <van-popup :show="addMemberShowPicker" position="bottom">
          <van-picker
              :columns="occupationList"
              :columns-field-names="occupationFieldName"
              @confirm="addShowPickerConfirm"
              @cancel="addMemberShowPicker = false"
          />
        </van-popup>
      </van-dialog>
    </div>
    <!--编辑成员-->
    <div class="edit-dialog">
      <van-dialog :show="editDialogShow" title="编辑成员" show-cancel-button
                  @confirm = "editDialogConfirm"
                  @cancel="editDialogShow = false">
        <van-field
            v-model="editMemberModel.name"
            name="名称"
            label="名称"
            placeholder="名称"
            :rules="[{ required: true, message: '请填写名称' }]"
        />
        <van-field
            v-model="editMemberModel.position"
            name="职务"
            label="职务"
            placeholder="职务"
            :rules="[{ required: true, message: '请填写职务' }]"
        />
        <van-field
            v-model="editMemberModel.occupation_name"
            name="picker"
            label="职业"
            placeholder="点击选择职业"
            @click="editMemberShowPicker = true"
        />
        <van-popup :show="editMemberShowPicker" position="bottom">
          <van-picker
              :columns="occupationList"
              :columns-field-names="occupationFieldName"
              @confirm="editShowPickerConfirm"
              @cancel="editMemberShowPicker = false"
          />
        </van-popup>
      </van-dialog>
    </div>
    <!--成员列表-->
    <div class="member-list">
      <van-pull-refresh :model="refreshing" @refresh="onRefresh">
        <van-list
            :loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
          <van-cell v-for="(item, index) in memberList" :key="index">
            <template #title>
              <span class="custom-title">{{item.name}}</span>
              <van-tag :color="item.occupation_color" style="margin-left: .2rem">{{item.occupation_name}}</van-tag>
              <van-tag type="primary" style="margin-left: .2rem">{{item.position}}</van-tag>
            </template>

            <template #value>
              <van-tag type="primary" @click="editDialogOpen(item)">编辑</van-tag>
              <van-tag type="danger" style="margin-left: .2rem" @click="deleteMember(item)">删除</van-tag>
            </template>
          </van-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>

</template>

<script>
import {showFailToast, showSuccessToast} from 'vant';
import http from "@/utils/http";
import memberApi from "@/api/member";
import occupationApi from "@/api/occupation";
import {setNav} from "@/utils/serverUtils";
import {ref, defineExpose} from 'vue';


export default {
  name: "v3-member",

  setup() {
    const searchModel = ref("");
    const editMemberModel = ref({});
    const addMemberModel = ref({});
    const memberList = ref([]);
    const occupationList = ref([]);
    const occupationFieldName = ref({
      text: 'name',
      value: 'uuid',
    });
    const editMemberShowPicker = ref(false);
    const editDialogShow = ref(false);
    const addMemberShowPicker = ref(false);
    const addDialogShow = ref(false);
    const pageNum = ref(1);
    const refreshing = ref(false);
    const loading = ref(false);
    const finished = ref(false);

    //list model begin
    const onLoad = () => {
      loading.value = true;
      refreshing.value = false;
      let filter = {
        name: "",
        position: "",
        occupation_uuid: "",
        key_name: searchModel.value
      }

      http({
        url: memberApi.queryMember.url,
        method: memberApi.queryMember.method,
        data: {
          filter: JSON.stringify(filter),
          page_num: pageNum.value,
          page_size: 10
        },

        onSuccess: function (res) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(item => {
              memberList.value.push(item)
            })
            loading.value = false;

            if (res.data.page_info.total_page > res.data.page_info.page_num) {
              ++pageNum.value;
            } else {
              finished.value = true;
            }
          }
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });

    }
    const onRefresh = () => {
      pageNum.value = 1;
      memberList.value = [];
      finished.value = false;
      loading.value = true;
      onLoad();
    }
    const onCancel = () => {
      searchModel.value = "";
      onRefresh();
    }
    //list model end


    //edit model begin
    const editDialogOpen = (data) => {
      editMemberModel.value = data;
      editDialogShow.value = true;
      onLoadOccupationList();
    };
    const editDialogConfirm = () => {
      http({
        url: memberApi.updateMember.url,
        method: memberApi.updateMember.method,
        data: editMemberModel.value,

        onSuccess: function () {
          onRefresh();
          editDialogShow.value = false;
          showSuccessToast("编辑成功！");
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    };
    const editShowPickerConfirm = ({ selectedOptions }) => {
      editMemberModel.value.occupation_uuid = selectedOptions[0].uuid;
      editMemberModel.value.occupation_name = selectedOptions[0].name;
      editMemberShowPicker.value = false;
    };
    //edit model end

    //add model begin
    const addDialogOpen = () => {
      addMemberModel.value = {};
      addDialogShow.value = true;
      onLoadOccupationList();
    }
    const addDialogConfirm = () => {
      http({
        url: memberApi.addMember.url,
        method: memberApi.addMember.method,
        data: addMemberModel.value,

        onSuccess: function () {
          onRefresh();
          addDialogShow.value = false;
          showSuccessToast("新增成功！");
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    };
    const addShowPickerConfirm = ({ selectedOptions }) => {
      addMemberModel.value.occupation_uuid = selectedOptions[0].uuid;
      addMemberModel.value.occupation_name = selectedOptions[0].name;
      addMemberShowPicker.value = false;
    };
    //add model end

    //delete model begin
    const deleteMember = (data) => {
      http({
        url: memberApi.deleteMember.url,
        method: memberApi.deleteMember.method,
        data: {
          uuid: data.uuid
        },

        onSuccess: function () {
          onRefresh();
          showSuccessToast("删除成功！");
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    }
    //delete model end

    //get occupationList
    const onLoadOccupationList = () => {
      http({
        url: occupationApi.listOccupation.url,
        method: occupationApi.listOccupation.method,

        onSuccess: function (res) {
          if (res.data.data.length > 0) {
            res.data.data.forEach(item => {
              occupationList.value.push(item);
            })
          }
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    }

    //open methods
    defineExpose({addDialogOpen});

    return {
      searchModel,
      memberList,
      pageNum,
      refreshing,
      loading,
      finished,
      onLoad,
      onRefresh,
      onCancel,

      occupationList,
      occupationFieldName,

      editMemberModel,
      editMemberShowPicker,
      editDialogShow,
      editDialogOpen,
      editDialogConfirm,
      editShowPickerConfirm,

      addMemberModel,
      addMemberShowPicker,
      addDialogShow,
      addDialogOpen,
      addDialogConfirm,
      addShowPickerConfirm,

      deleteMember,
      onLoadOccupationList,
    };
  },

  mounted() {
    setNav("成员管理", "返回", "新增", false, false);
  },


}
</script>

<style scoped>

</style>