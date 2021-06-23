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
            New Address
          </h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="row">
              <div class="col-md-6">
                <label
                  for="label"
                  class="control-label"
                >
                  Label
                </label>
                <input
                  v-model="label"
                  type="text"
                  class="form-control"
                  placeholder="Contoh: Rumah, Kantor, Apartment dll"
                />
              </div>
              <div class="col-md-6">
                <label
                  for="label"
                  class="control-label"
                >
                  Phone
                </label>
                <input
                  v-model="phone"
                  type="text"
                  class="form-control"
                  placeholder="Phone"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-6">
                <label
                  for="province"
                  class="control-label"
                >
                  Province
                </label>
                <select
                  v-model="province"
                  class="form-control"
                >
                  <option value="">
                    Select Province
                  </option>
                  <option
                    v-for="(listprovince, provI) in listprovinces"
                    :key="provI"
                    :value="listprovince.province_id"
                  >
                    {{ listprovince.province }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label
                  for="province"
                  class="control-label"
                >
                  City
                </label>
                <select 
                  v-model="city"
                  class="form-control"
                >
                  <option value="">
                    Select City
                  </option>
                  <option
                    v-for="(listcity, cityI) in listcities"
                    :key="cityI"
                    :value="listcity.city_id"
                  >
                    {{ listcity.city_name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-md-6">
                <label
                  for="province"
                  class="control-label"
                >
                  District
                </label>
                <select
                  v-model="district"
                  class="form-control"
                >
                  <option value="">
                    Select District
                  </option>
                  <option
                    v-for="(listdis, disI) in listdistricts"
                    :key="disI"
                    :value="listdis.subdistrict_id"
                  >
                    {{ listdis.subdistrict_name }}
                  </option>
                </select>
                <input
                  v-if="country == 'ph'"
                  type="text"
                  class="form-control"
                  placeholder="District"
                />
              </div>
              <div class="col-md-6">
                <label
                  for="province"
                  class="control-label"
                >
                  Postal Code
                </label>
                <input
                  v-model="pos_code"
                  type="text"
                  class="form-control"
                  placeholder="Enter Postal Code"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label
              class="control-label"
              for="address"
            >
              Address
            </label>
            <textarea
              v-model="full_address"
              placeholder="Enter address"
              class="form-control" 
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-default"
            @click="onClicked"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props:{
    onsubmit: {
      type: Function,
      default: function() {
        return ''
      }
    },
    actaddress: {
      type: Object,
      default: function() {
        return {}
      },
    },
    listprovinces: {
      type: Array,
      default: function() {
        return []
      }
    },
    getlistcities: {
      type: Function,
      default: function() {
        return []
      }
    },
    listcities: {
      type: Array,
      default: function() {
        return []
      }
    },
    getlistdistricts: {
      type: Function,
      default: function() {
        return []
      }
    },
    listdistricts: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data(){
    return{
      label: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      pos_code: '',
      full_address: '',
      type: '',
      country: this.$store.state.auth.country
    }
  },

  watch: {
    type(newValue) {
      if(newValue == 'cod') {
        this.label = 'cod'
        this.phone = this.actaddress ? this.actaddress.phone : ''
        this.province = 6
        this.getlistcities(6)
        this.city = 39
        this.getlistdistricts(39)
        this.district = 373
        this.pos_code = 11750
        this.full_address = 'Pergudangan 3 Multi Gudang Jalan Manis Raya Bitung, Tanggerang, Cikupa Blok B1'
      } else {
        this.label = ''
        this.phone = ''
        this.province = ''
        this.city = ''
        this.district = ''
        this.pos_code = ''
        this.full_address = ''
      }
    },
    province(newValue) {
      this.getlistcities(newValue)
    },
    city(newValue) {
      this.getlistdistricts(newValue)
    }
  },

  methods:{
    onClicked(){
      this.onsubmit({
        option_shipping:this.type, 
        address_lable:this.label, 
        phone_number:this.phone, 
        district:this.district, 
        city:this.city, 
        province:this.province,
        pos_code:this.pos_code, 
        full_address: this.full_address,
        dump:{
          province: this.listprovinces.filter(x => x.province_id == this.province)[0],
          city:this.listcities.filter(x => x.city_id == this.city)[0],
          district:this.listdistricts.filter(x => x.subdistrict_id == this.district)[0]
        }
      })
    }
  }
}
</script>