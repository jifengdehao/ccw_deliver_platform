/*
 * @Author: huShangJun 
 * @Date: 2018-03-07 17:16:32 
 * DeveloperMailbox:   hsjcc@ccw163.com 
 * FunctionPoint: 课程培训 
 */

<template>
  <div id="s_platform">
    <!-- 头部 -->
    <section class="header">
      <h2>课程培训</h2>
      <div class="header-search" @keydown.enter="onSearch">
        <Input placeholder="姓名/联系方式/身份证号" style="width: 200px" v-model="params.condition"></Input>
        <!-- <Icon type="close-circled icos icosS" v-if="searchData" @click.native="onDelete"></Icon> -->
        <Icon type="ios-search icos" @click.native="onSearch"></Icon>
      </div>
    </section>
     <!-- 指教按钮 -->
    <section class="button clearfix">
      <Button class="fr" @click="showAddModal">增加</Button>
    </section>
    <!-- 表格 -->
    <section class="c_auditing_list">
      <Table border  ref="selection" :columns="columns" :data="courseList.records"></Table>
    </section>
    <!-- 分页 -->
    <section class="seller-video-manager-page">
      <Page :total="courseList.total" show-total :page-size="courseList.size" :current="courseList.current" @on-change="changepage"></Page>
    </section>
    <!-- 增加，编辑弹窗 -->
    <Modal v-model="addCourse" :title="modalTitle" :mask-closable="false" >
       <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
        <FormItem label="课程编号:" prop="courseNo">
            <Input v-model="formItem.courseNo" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem>
         <FormItem label="课程类型:" prop="courseType">
            <!-- <Input v-model="formItem.courseType" style="width:200px" placeholder="Enter something..." ></Input> -->
            <Select v-model="formItem.courseType" style="width:200px">
              <Option :value="1">新人培训</Option>
              <Option :value="2">星级培训</Option>
            </Select>
        </FormItem> 
         <FormItem label="课程名称:" prop="courseName">
            <Input v-model="formItem.courseName" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
         <FormItem label="课程内容:">
            <Input v-model="formItem.content" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
         <FormItem label="课程地点:" prop="address">
            <Input v-model="formItem.address" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
         <FormItem label="课程时间:" prop="trainingDate">
            <!-- <Input v-model="formItem.trainingDate" style="width:200px" placeholder="Enter something..." ></Input> -->
            <DatePicker v-model="formItem.trainingDate" :options="options3" type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
        </FormItem> 
         <FormItem label="人数限制:">
            <Input v-model="formItem.upper_limit" style="width:200px" placeholder="Enter something..." ></Input>
        </FormItem> 
        <FormItem label="介绍图片:">
          <div class="img fl" v-if="formItem.coursePic">
            <img :src="formItem.coursePic" alt="" >
            <!-- <div class="cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(formItem.coursePic)"></Icon>
            </div> -->
          </div>
          <div class="uploadButton">
            <input type="file" @change="iconUrlUpload" accept="image/*">+
          </div>
        </FormItem>
         <FormItem >
            <Button type="info" style="width:60px;margin:auto" @click="addcourse('formItem')">保存</Button>
        </FormItem>
      </Form>
      <div slot="footer">
        </div>
    </Modal>
    <Modal v-model="delModal" title="删除课程" @on-ok="delCourse">
      <h2>是否删除该课程？</h2>
    </Modal>
  </div>
</template>
<script>
import * as api from '@/api/common.js'
import * as time from '@/until/time'
import { uploadpic } from '../../assets/upload-pic'
export default {
  components: {},
  data() {
    return {
      options3: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }, // 过去的时间不可选
      params: {
        pageNumber: 1,
        pageSize: 20,
        condition: '' // 查询条件
      },
      courseList: {}, // 课程列表返回内容
      addCourse: false, // 增加，编辑弹窗
      delModal: false, // 删除弹框
      currentId: null, // 删除课程的ID
      formItem: {
        courseType: 1
      }, // 弹窗表格内容
      modalTitle: '',
      columns: [
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'center'
        },
        {
          title: '课程编号',
          key: 'courseNo'
        },
        {
          title: '课程类型',
          key: 'courseType'
        },
        {
          title: '课程名称',
          key: 'courseName'
        },
        {
          title: '课程内容',
          key: 'content'
        },
        {
          title: '培训地点',
          key: 'address'
        },
        {
          title: '培训时间',
          key: 'trainingDate',
          render: (h, params) => {
            return time.formatDateTime(params.row.trainingDate)
          }
        },
        {
          title: '人数限制',
          key: 'upperLimit'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.modalTitle = '编辑课程'
                      this.addCourse = true
                      this.getCourseInfo(params.row.psTrainCourseId)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.delModal = true
                      this.currentId = params.row.psTrainCourseId
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      ruleValidate: {
        courseNo: [
          {
            required: true,
            message: '请输入课程编号',
            trigger: 'blur'
          }
        ],
        courseType: [
          {
            required: true,
            message: '请选择课程类型'
          }
        ],
        courseName: [
          {
            required: true,
            message: '请输入课程名称',
            trigger: 'blur'
          }
        ],
        address: [
          {
            required: true,
            message: '请输入课程地址',
            trigger: 'blur'
          }
        ],
        trainingDate: [
          {
            required: true,
            message: '请选择课程时间'
          }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.getCourseTrain()
  },
  methods: {
    // 获取课程
    getCourseTrain() {
      api.getCourseTrain(this.params).then(res => {
        this.courseList = res
      })
    },
    // 查询指定课程信息
    getCourseInfo(id) {
      api.getCourseInfo(id).then(res => {
        this.formItem = res
      })
    },
    // 搜索
    onSearch() {
      if (this.params.condition) {
        this.getCourseTrain()
      }
    },
    // 分页
    changepage(index) {
      this.params.pageNumber = index
      this.getCourseTrain()
    },
    // 增加按钮
    showAddModal() {
      this.formItem = {}
      this.modalTitle = '增加课程'
      this.addCourse = true
    },
    // 增加，编辑提交
    addcourse(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.addCourse(this.formItem).then(res => {
            this.addCourse = false
            this.$Message.success('提交成功')
            this.getCourseTrain()
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    // 删除课程
    delCourse() {
      api.delCourse(this.currentId).then(res => {
        this.$Message.success('删除成功')
        this.getCourseTrain()
      })
    },
    iconUrlUpload(e) {
      var file = e.target.files[0]
      uploadpic(file).then(res => {
        if (res) {
          this.formItem.coursePic = res[0].indexOf('?')
            ? res[0].split('?')[0]
            : res[0]
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
#s_platform {
  .header {
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    background-color: #363e54;
    h2 {
      float: left;
      color: #fff;
      margin-left: 20px;
    }
    .header-search {
      position: relative;
      float: right;
      margin-right: 45px;
    }
    .icosS {
      color: #5c6b77 !important;
      right: 3px !important;
      font-size: 16px !important;
      line-height: 26px;
    }

    .icos {
      position: absolute;
      top: 8px;
      right: -25px;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
    }
  }
  .button {
    margin-bottom: 10px;
  }
  .seller-video-manager-page {
    margin-top: 10px;
    text-align: right;
  }
}
.img {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 3px;
}
.img img {
  width: 100%;
  height: 100%;
}
/* 图片的遮罩层 */
.cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.img:hover .cover {
  display: block;
  width: 80px;
  height: 80px;
  text-align: center;
}
.cover i {
  color: #fff;
  font-size: 30px;
  // cursor: pointer;
  margin: 0 2px;
  line-height: 80px;
}
.bigimg {
  max-width: 850px;
  min-width: 300px;
}
input[type='file'] {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer;
  overflow: hidden;
}
.uploadButton {
  width: 80px;
  height: 80px;
  line-height: 60px;
  position: relative;
  cursor: pointer;
  text-align: center;
  font-size: 80px;
  margin-left: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: inline-block;
  *display: inline;
  *zoom: 1;
}
</style>
