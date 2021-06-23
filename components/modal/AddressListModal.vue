<template>
  <div
    class="modal fade"
    role="dialog"
  >
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
          >
            &times;
          </button>
          <h4 class="modal-title">
            Select Address
          </h4>
        </div>
        <div class="modal-body">
          <ul class="address">
            <li
              v-for="(lAddress, i) in listaddress"
              :key="i"
              class="address-item"
            >
              <span class="address-person">
                {{ lAddress.receiver_name }}
              </span>
              <span>{{ lAddress.phone }}</span>
              <span>{{ lAddress.label }}</span>
              <span>
                {{ lAddress.address }}, {{ lAddress.ro_district ? lAddress.ro_district+',' : '' }} {{ lAddress.ro_city ? lAddress.ro_city+',' : '' }} {{ lAddress.ro_province ? lAddress.ro_province+',' : '' }} {{ lAddress.pos_code }}, {{ lAddress.country.name }}
              </span>
              <div class="radio-container">
                <input
                  type="radio"
                  name="radio"
                  :checked="lAddress.is_default"
                  @click="onpresscust(lAddress.id)"
                />
                <span class="checkmark" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    onSubmit: {
      type:Function,
      default: function() {
        return []
      },
    },
    onpresscust: {
      type:Function,
      default: function() {
        return []
      },
    },
    title : {
      type:String,
      default: "",
    },
    listaddress:{
      type:Array,
      default: function() {
        return []
      },
    }
  },
}
</script>

<style lang="scss" scoped>
    .modal-body{
        padding-bottom: 0px;
    }

    .address{
        max-height: 350px;
        overflow: scroll;
    }
</style>