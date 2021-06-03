<template>
  <v-container class="fill-height">
    <v-row class="align-center">
      <v-col col="6">
        <v-img width="100%"
          :src="require('@/assets/img/credit_card_background.jpeg')"
          class="card_item_bg pa-3"
        >
          <v-row>
            <v-col col="12" class="align-right text-right">
              <div class="card_type_wrapper">
                <div class="visa_image">
                  <v-img :src="require('@/assets/img/visa.png')">
                  </v-img>
                </div>
                <div class="visa_image ml-2">
                  <v-img :src="require('@/assets/img/mastercard.png')">
                  </v-img>
                </div>
                <div class="visa_image ml-2">
                  <v-img :src="require('@/assets/img/mastercard.png')">
                  </v-img>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12" class="align-left text-left pt-0">
              <div class="card_type_wrapper text-color">
                <label for="cardNumber">CARD NUMBER</label>
                <v-row>
                  <v-col col="2" v-for="(todo, index) in cardNumber" :key="todo.id">
                    <v-text-field dark type="number" dense outlined hide-details :disabled="cardNumberDisabled" class="field_background_color"
                    v-model="todo.value" 
                    ref="cardNumber"
                    @input="moveToNextField($event, index)">
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col col="12" class="pt-0">
              <div class="card_type_wrapper text-color">
                <v-row>
                  <v-col col="6">
                    <label for="cardName">THE NAME ON THE CARD</label>
                    <v-text-field
                      dark
                      type="text"
                      dense
                      outlined
                      flat
                      hide-details
                      v-model="cardName"
                      class="field_background_color"
                      autocomplete="off"
                      ref="cardName"
                      @change="changeEvent"
                      :disabled="cardNameDisabled"
                    ></v-text-field>
                  </v-col>
                  <v-col col="6">
                    <label for="cardValidy">Validity</label>
                    <v-row>
                      <v-col col="2">
                        <v-autocomplete
                          v-model="cardMonth"
                          :items="months"
                          outlined
                          hide-details
                          dense
                          class="field_background_color"
                          @change="changeEvent"
                          :disabled="cardExpiryDisabled"
                        >
                        </v-autocomplete>
                      </v-col>
                      <span class="seperator pt-2">/</span>
                      <v-col col="2">
                        <v-autocomplete
                          v-model="cardYear"
                          :items="years"
                          outlined
                          hide-details
                          dense
                          class="field_background_color"
                          @change="changeEvent"
                          :disabled="cardExpiryDisabled"
                        >
                        </v-autocomplete>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-10">
            <v-col col="2" class="pt-2 pl-16 text-right align-right text-color">
              <label for="cardCvv">CCV/CVC</label>
            </v-col>
            <v-col col="2" class="pt-0 text-left align-left">
              <v-text-field dark type="number" dense outlined hide-details v-model="cardCvv" @change="changeEvent" class="field_background_color field_box_size" :disabled="cardCvvDisabled">
              </v-text-field>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
      <div id="loading_overlay" v-if="isLoading">
        <v-progress-circular 
          :size="70" 
          indeterminate 
          class="primary--text"
        />
      </div>
      <v-col col="6" v-if="paymentStatusScreen == false">
        <v-row class="justify-center align-center">
          <v-col col="12">
            <div>
              <v-text-field
                type="number"
                class="payment_amount_field"
                dense
                outlined
                hide-details
                v-model="paymentAmount"
                placeholder="AMOUNT OF PAYMENT"
                autocomplete="off"
                @change="changeEvent"
                :disabled="amountPayDisabled"
              >
              </v-text-field>
            </div>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center">
          <v-col col="12">
            <span class="pl-2 text-font">Commision : </span>
            <span class="pl-2 text-font">{{calculateCommision}}</span>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center">
          <v-col col="12">
            <span class="pl-2 text-font">Total Amount :</span>
            <span class="pl-2 text-font">{{calculateAmountWithCommision}}</span>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center">
          <v-col col="12">
            <v-btn medium outlined color="primary" class="text-font payment_amount_field" :disabled="isDisabled" @click="amountPay">
              PAY
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center">
          <v-col col="12" class="pt-0 pl-4">
            <v-checkbox
              v-model="termsPrivacyCheckbox"
              label="I have read and agree to the privacy policy"
              @change="changeEvent"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row class="justify-center align-center mt-0">
          <v-col col="12" class="pt-0 pl-4">
            <div class="notes">
              Commision may be withheld by the issuing bank of the sender's card 
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col col="6" v-else>
        <v-row class="justify-center align-center text-center">
          <v-col v-if="paymentStatus == 1">
            <v-icon class="status_icon_size" large style="color: #5CB85C">
              mdi-check-circle
            </v-icon>
            <div>
              <h3>Transfer Completed !</h3>
            </div>
            <div>
              <span><b>Sender : </b></span><span>{{senderName}}</span>
            </div>
            <div>
              <span><b>Total : </b></span>
              <span>{{AmountWithCommision}}</span>
            </div>
            <div>
              <span><b>Commision : </b></span>
              <span>{{commisionValue}}</span>
            </div>
            <div class="mt-3">
              <v-btn medium outlined class="text-font payment_amount_field payment_failed_button_background text-color" @click="successBtnClick">
              OK
              </v-btn>
            </div>
          </v-col>
          <v-col v-if="paymentStatus == 2">
            <v-icon class="status_icon_size" large style="color: #ED1B24">
              mdi-close-circle
            </v-icon>
            <div>
              <h3>Payment Error !</h3>
            </div>
            <div>
              <h4>Please try again</h4>
            </div>
            <div class="mt-3">
              <v-btn medium outlined class="text-font payment_amount_field payment_failed_button_background text-color" @click="amountPay">
              REPEAT
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./Home.js"></script>

<style>
.card_item_bg {
  border-radius: 10px;
}
.field_background_color {
  background: #b22929;
}
.card_type_wrapper {
  display: block;
  margin-right: 80px;
  margin-top: 5px;
}
.card_type_wrapper .visa_image {
  display: inline-block;
}
.seperator {
  font-size: 28px;
}
.field_box_size {
  width: 80px !important;
}
.payment_amount_field {
  width:205px;
  border-radius: 50px !important;
}
.text-font {
  font-size: 18px;
}
.notes {
  text-align: center;
  width: 350px;
}
.v-progress-linear {
  display: block;
  width: 100%;
  margin: 0 auto;
  opacity: 0.8;
  background-color: black;
}
.status_icon_size {
  font-size: 110px !important;
}
.payment_failed_button_background {
  background: #ed1b24;
}
.text-color {
  color: #fff !important;
}
</style>