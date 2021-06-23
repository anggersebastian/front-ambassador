<template>
  <section class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          Copyright © 2020 - <span class="currenc-years" /> importir.net
        </div>
        <div class="col-lg-6">
          <div class="footer-policy">
            <nuxt-link to="/syarat-ketentuan">
              Syarat dan Ketentuan 
            </nuxt-link>
            <span>|</span>
            <nuxt-link
              to="/refund-policy"
              style="margin-left:0px;"
            >
              Refund Policy
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
    

    .footer{
        padding: 20px;
        font-size: 12px;
    }
    .footer-policy{
        display:flex;
        flex-direction: row;
        justify-content: flex-end;
        font-size: 12px;
        font-weight: bold;
    }
</style>