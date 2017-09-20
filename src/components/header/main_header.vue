<template>
  <div>
    <header>
      <div class="O_titlebar" >
        <h3 class="fl">
          <slot name="h3"></slot>
        </h3>
        <ul class="fl">
          <slot name="ul"></slot>
        </ul>
        <div class="O_search fr">
          <slot></slot>
        </div>
        <div class="fr">
          <slot name="button"></slot>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
  export default {

    data() {
      return {


      }

    },

    methods: {
      getCurrentDate() {
        return new Date().toLocaleDateString()
      },


    }
  }
</script>
<style lang="less" scoped>
  header{
    height: 65px;
    padding-top: 20px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
    .O_titlebar{
      height: 40px;
      background-color: #888;
      padding-left: 30px;
      line-height: 40px;
      h3{
        color:#ffffff;
        font-size: 16px;
        font-weight: 550;

      }
    }
    ul{
      width: 60%;
      li{
        width: 18%;
        height: 100%;
        float: left;
        Button{}
      }
    }

    .O_search{
      width: 31%;
      input{
        width: 85%;
        height: 30px;
        border-radius: 5px;
      }
      .O_search_icon{
        font-size: 30px;
        color: #fff;
        vertical-align: middle;
      }
    }
  }

</style>
