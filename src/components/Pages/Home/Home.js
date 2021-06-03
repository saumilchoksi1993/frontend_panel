export default {
    data() {
        return {
            currentCardBackground: Math.floor(Math.random()* 25 + 1),
            cardName: "",
            max:4,
            cardNumber: [
              { id: "1", value: "" },
              { id: "2", value: "" },
              { id: "3", value: "" },
              { id: "4", value: "" }
            ],
            cardNumber1: "",
            cardNumber2: "",
            cardNumber3: "",
            cardNumber4: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",
            paymentAmount: "",
            termsPrivacyCheckbox: false,
            minCardYear: new Date().getFullYear(),
            cardNumberTemp: "",
            isCardFlipped: false,
            focusElementStyle: null,
            isInputFocused: false,
            cardNumberMaxLength: 19,
            isDisabled: true,
            months: ["01", "02", "03", "04", "05", "06", "07","08", "09", "10", "11", "12"],
            years: ["2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031"],
            isLoading: false,
            cardNumberDisabled: false,
            cardNameDisabled: false,
            cardExpiryDisabled: false,
            cardCvvDisabled: false,
            amountPayDisabled: false,
            paymentStatusScreen: false,
            paymentStatus: 0,
            senderName: '',
            commisionValue: 0,            
            AmountWithCommision: 0,
        }
    },
    mounted() {
        let paymentStatus = this.$route.query.paymentStatus
        if((paymentStatus == 1 || paymentStatus == 2) && this.paymentAmount == '') {
            this.$router.push({
                path: '/'
            });
        }
    },
    computed: {
        calculateCommision() {
            if (this.paymentAmount) {
                if(this.paymentAmount > 1) {
                    this.paymentAmount = parseInt(this.paymentAmount)
                    let commisionValue = ((this.paymentAmount * 1) / 100)
                    return commisionValue
                }
            } else {
                return ''
            }
        },
        calculateAmountWithCommision() {
            if (this.paymentAmount) {
                if(this.paymentAmount > 1) {
                    this.paymentAmount = parseInt(this.paymentAmount)
                    let commisionValue = ((this.paymentAmount * 1) / 100)
                    let AmountWithCommision = commisionValue + this.paymentAmount
                    return AmountWithCommision
                }
            } else {
                return ''
            }
        }
    },
    watch: {
        $route(to, from) {
            console.log("from is : ", from.query)
            if(to.query.paymentStatus) {
                console.log("Payment Status is : ", to.query.paymentStatus)
                console.log("Amount is : ", this.paymentAmount)
                this.paymentStatus = to.query.paymentStatus
                let paymentAmount = parseInt(this.paymentAmount)
                this.commisionValue = ((paymentAmount * 1) / 100)
                this.AmountWithCommision = this.commisionValue + paymentAmount
                this.senderName = this.cardName
                this.paymentStatusScreen = true
            }
        }
    },
    methods: {
        validateIsDisabled() {
            const found = this.cardNumber.some(el => (el.value == '') || el.value.length < 4);
            console.log("this.cardNumber is : ", this.cardNumber)
            let cardNumberValidation = false
            if (!found) {
                cardNumberValidation = true
            }
            if(cardNumberValidation && this.cardName.length > 0 && this.cardMonth.length > 0 && this.cardYear.length > 0 && this.cardCvv.length > 0 && parseInt(this.paymentAmount) > 0 && this.termsPrivacyCheckbox == true) {
                this.isDisabled = false
            } else {
                this.isDisabled = true
            }
        },
        moveToNextField(value, index) {
            this.validateIsDisabled()
            if(index < 3) {
                const nextIndex = index + 1
                if (value.length > 3) {
                    if(typeof this.$refs.cardNumber == 'undefined') {
                        return;
                    } else {
                        if(value.length > 4) {
                            this.cardNumber[index].value = 
                            value.slice(0, 4)
                        }
                        this.$refs.cardNumber[nextIndex].focus()
                    }
                } else {
                    return;
                }
            } else {
                if (value.length > 3) {
                    this.$refs.cardName.focus()
                }
            }
        },
        changeEvent() {
            this.validateIsDisabled()
        },
        disableAllFields() {
            this.cardNumberDisabled = true
            this.cardNameDisabled = true
            this.cardExpiryDisabled = true
            this.cardCvvDisabled = true
            this.amountPayDisabled = true
            this.isDisabled = true
        },
        // Takes a credit card string value and returns true on valid number
        checkCreditCardNumberValidWithLuhanAlgo(value) {
          // Accept only digits, dashes or spaces
            if (/[^0-9-\s]+/.test(value)) return false;

            // The Luhn Algorithm. It's so pretty.
            let nCheck = 0, bEven = false;
            value = value.replace(/\D/g, "");

            for (var n = value.length - 1; n >= 0; n--) {
                var cDigit = value.charAt(n),
                      nDigit = parseInt(cDigit, 10);

                if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

                nCheck += nDigit;
                bEven = !bEven;
            }

            return (nCheck % 10) == 0;
        },
        amountPay() {
            // Check credit card number is valid or not.
            let creditCardString = this.cardNumber[0].value + this.cardNumber[1].value + this.cardNumber[2].value + this.cardNumber[3].value
            let cardValid = this.checkCreditCardNumberValidWithLuhanAlgo(creditCardString)
            if(cardValid) {
                this.isLoading = true
                this.disableAllFields()
                let status = [1, 2]
                var scope = this;
                setTimeout(function() {
                    let randomStatus = Math.floor(Math.random() * status.length);
                    scope.isLoading = false
                    scope.$router.push({
                        path: '/',
                        query: { paymentStatus: status[randomStatus] }
                    }).catch(()=>{});
                }, 1000);
            } else {
                alert("Card number is not valid !")
            }
        },
        successBtnClick() {
            this.$router.go(this.$router.currentRoute)
        },
        repeatPayment() {
            this.isLoading = true
            let status = [1, 2]
            var scope = this;
            setTimeout(function() {
                let randomStatus = Math.floor(Math.random() * status.length);
                scope.isLoading = false
                scope.$router.push({
                    path: '/',
                    query: { paymentStatus: status[randomStatus] }
                }).catch(()=>{});
            }, 1000);
        }
    }
}