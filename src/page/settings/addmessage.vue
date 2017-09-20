<template>
    <div id="addmessage" class="main">
        <main-header>
          <span slot="h3">新增消息</span>
        </main-header>
      <section class="addmessage_list">
        <p>
          <h2 style="font-size: 20px;display: inline-block;width: 150px">发布时间： </h2><Select v-model="model2" size="large" style="width:80px">
          <Option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select> 年
          <Select v-model="model2" size="large" style="width:50px">
            <Option v-for="item in Nub" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>月
          <Select v-model="model2" size="large" style="width:50px">
            <Option v-for="item in Nub" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>日
          <Select v-model="model2" size="large" style="width:50px">
            <Option v-for="item in Nub" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>时
          <Select v-model="model2" size="large" style="width:50px">
            <Option v-for="item in Nub" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>分
        </p>
        <p>
        <h2 style="font-size: 20px;display: inline-block;width: 150px">发布类型： </h2><Select v-model="model2" size="large" style="width:200px">
        <Option v-for="item in date" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
        </p>
        <p>
        <h2 style="font-size: 20px;display: inline-block;width: 150px">标题： </h2>
        <input type="text" style="width: 200px;height: 36px;border: 1px solid #ddd;border-radius: 5px">
        </p>
        <p>
        <h2 style="font-size: 20px;display: inline-block;width: 150px">内容： </h2>
        <textarea name="" id="" cols="50" rows="10" style="border: 1px solid #ddd;border-radius: 5px;vertical-align: top;font-size: 16px;padding: 5px;" placeholder="请输入内容"></textarea>

        </p>
      </section>
      <section class="addmessage_button">
        <Button size="large"style="width: 200px;background-color: #fff;">取消</Button>
        <Button size="large"style="width: 200px;background-color: #fff;">确定</Button>

      </section>
    </div>
</template>
<script>
    import mainHeader from '../../components/header/main_header.vue'
    export default {
        components: {mainHeader},
        data() {
            return {
              model2:'',
              date:[
                {
                  value: '2000',
                  label: '2000'
                },
                {
                  value: '2001',
                  label: '2001'
                },
                {
                  value: '2002',
                  label: '2002'
                },
                {
                  value: '2003',
                  label: '2003'
                },
              ],
              Nub:[
                {
                  value: '1',
                  label: '1'
                },
                {
                  value: '2',
                  label: '2'
                },
                {
                  value: '3',
                  label: '3'
                },
                {
                  value: '4',
                  label: '4'
                },
              ]
            }
        },
        methods: {
            getCurrentDate() {
                return new Date().toLocaleDateString()
            }
        }
    }
</script>
<style lang="less" scoped>
    #addmessage{
      .addmessage_list{
        text-align: left;
        padding-top: 30px;
        p{
          margin-top: 10px;
          font-size: 16px;

        }
      }
      .addmessage_button{
        width: 100%;
        position: absolute;
        bottom: 30px;
      }
    }

</style>
