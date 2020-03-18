<template>
  <div v-click-outside>
    <input type="text" :value="formatDate" />
    <div class='pannel' v-if="isVisible">
        <div class=pannel-nav>
            <span>xxx年</span>
        </div>
        <div class=pannel-content></div>
        <div class=pannel-footer></div>
    </div>
  </div>
</template>

<script>
import * as utils from "../../utils/utils";
export default {
    directives:{
        clickOutside:{
            bind(el,bindings,vnode){
                let handler = (e)=>{
                    if(el.contains(e.target)){
                        if(!vnode.context.isVisible){
                        vnode.context.focus()
                        }
                    }else{
                        if(vnode.context.isVisible){
                        vnode.context.blur()
                        }
                    }
                }
                el.handler=handler
                document.addEventListener('click',handler)
            },
            unbind(e){
                document.removeEventListener('click',el.handler)
            }
        }
    },
  data() {
    return {
      isVisible: false
    };
  },
  props: {
    value: {
      type: Date,
      default: () => new Date() // 返回的默认值必须是函数
    }
  },
  methods:{
      focus(){
          this.isVisible=true
      },
      blur(){
          this.isVisible=false
      }
  },
  computed: {
    formatDate() {
      let { year, month, day } = utils.getYearMonthDay(this.value);
      return `${year}-${month}-${day}`
    }
  }
};
</script>
<style scoped>
</style>