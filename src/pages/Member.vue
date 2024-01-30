<template>
  <div class="member">

    <div class="search">
      <form action="/">
        <van-search
            v-model="searchModel"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
      </form>
    </div>

    <div class="edit-dialog">
      <van-dialog :show="editDialogShow" title="编辑成员" show-cancel-button
                  @confirm = "editDialogConfirm()"
                  @cancel="editDialogCancel()">
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
      </van-dialog>
    </div>

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
              <van-tag type="success">{{item.occupation_name}}</van-tag>
              <van-tag type="primary" style="margin-left: .2rem">{{item.position}}</van-tag>
            </template>

            <template #value>
              <van-tag type="primary" @click="editMember(item)">编辑</van-tag>
              <van-tag type="danger" style="margin-left: .2rem">删除</van-tag>
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
import {setNav} from "@/utils/serverUtils";

export default {
  name: "v3-member",

  mounted() {
    setNav("成员管理", "返回", "", false, true);
    this.queryMember(1);
  },

  data() {
    return {
      searchModel: "",
      refreshing: false,
      loading: false,
      finished: false,
      memberList: [],

      editDialogShow: false,
      editMemberModel: {
        name: "",
        position: "",
        occupation_uuid: ""
      },
    }
  },

  methods: {

    queryMember: function (page) {
      let _this = this;
      let filter = {
        name: "",
        position: "",
        occupation_uuid: "",
        key_name: _this.searchModel
      }
      let page_size = 10

      http({
        url: memberApi.queryMember.url,
        method: memberApi.queryMember.method,
        data: {
          filter: JSON.stringify(filter),
          page_num: page,
          page_size: page_size
        },

        onSuccess: function (res) {
          console.log(res.data.data.length);
          if (res.data.data.length > 0) {
            res.data.data.forEach(item => {
              _this.memberList.push(item)
            })
            _this.queryMember(++page);
          }
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    },

    onSearch() {
      this.memberList = [];
      this.queryMember(1);
    },

    onCancel() {
      this.searchModel = "";
      this.memberList = [];
      this.queryMember(1);
    },

    editMember(data) {
      this.editMemberModel = data;
      this.editDialogShow = true;
    },

    editDialogConfirm() {
      let _this = this;
      http({
        url: memberApi.updateMember.url,
        method: memberApi.updateMember.method,
        data: _this.editMemberModel,

        onSuccess: function () {
          this.memberList = [];
          this.editDialogShow = false;
          showSuccessToast("编辑成功！");
          _this.queryMember(1);
        },

        onError: function (res) {
          showFailToast(res.data.msg);
        }
      });
    },

    editDialogCancel() {
      this.editDialogShow = false;
    },

    onLoad() {

    },

    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    }

  }

}
</script>

<style scoped>

</style>