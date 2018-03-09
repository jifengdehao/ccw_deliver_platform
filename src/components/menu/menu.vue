<template>
  <Menu theme="dark" @on-select="route" width="auto" :active-name="activeName"  accordion>
    <template v-for="item in menu">
      <MenuItem v-if="item.noDropdown && item.name" :name="item.url">
        <Icon :type="item.icon" :size="iconSize"></Icon>
        <span >{{item.name}}</span>
      </MenuItem>
      <Submenu v-else :name="item.name">
        <template slot="title">
          <Icon :type="item.icon" :size="iconSize"></Icon>
          <span >{{item.name}}</span>
        </template>
        <template v-for="m in item.submenu">
          <Menu-item :name="m.url" v-if="m.submenu.length <= 0">{{m.name}}</Menu-item>
          <MenuGroup v-else :title="m.name" style="padding-left: 18px;">
                <Menu-item :name="childs.url" v-for="(childs,index) in m.submenu" :key="index">{{childs.name}}</Menu-item>
          </MenuGroup>
        </template>
      </Submenu>
    </template>
  </Menu>
</template>
<script type='text/ecmascript-6'>
import * as api from '@/api/common'

export default {
  props: {
    spanLeft: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      menu: []
    }
  },
  computed: {
    activeName() {
      return this.$route.path.split('/')[1]
    },
    iconSize() {
      return this.spanLeft === 3 ? 14 : 24
    }
  },
  created() {
    this.getMenu()
  },
  methods: {
    route(name) {
      this.$router.push('/' + name)
    },
    getMenu() {
      api.getMenu().then(res => {
        if (res) {
          let menuIcom = [
            'home',
            'ios-paper',
            'ios-people',
            'ios-gear',
            'stats-bars',
            'settings',
            'person-stalker',
            'person-stalker'
          ]
          this.menu = res.map((item, index) => {
            if (item.childMenusList.length > 0) {
              return {
                icon: menuIcom[index],
                name: item.menuName,
                id: item.menusId,
                url: item.url,
                noDropdown: false,
                submenu: item.childMenusList.map(item => {
                  return {
                    name: item.menuName,
                    id: item.menusId,
                    url: item.url,
                    noDropdown: false,
                    submenu: item.childMenusList.map(res => {
                      return {
                        name: res.menuName,
                        id: res.menusId,
                        url: res.url
                      }
                    })
                  }
                })
              }
            }
            return {
              icon: menuIcom[index],
              name: item.menuName,
              id: item.menusId,
              url: item.url,
              noDropdown: true
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
</style>
