<script>
    import UserAgreement from '@/components/UserAgreement.vue'
    import { VueFinalModal } from 'vue-final-modal'
    export default {
        components: { UserAgreement, VueFinalModal },
        data: () => ({
			persons: [
				{ label: 'Электронная почта', value: '', pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, valid: null, touched: false },
				{ label: 'Номер телефона', value: '', pattern: /^[0-9]{7,14}$/, valid: null, touched: false },
				{ label: 'Фамилия', value: '', pattern: /^[a-zA-Zа-яА-Я ]{2,30}$/, valid: null, touched: false },
				{ label: 'Имя', value: '', pattern: /^[a-zA-Zа-яА-Я ]{2,30}$/, valid: null, touched: false }
			],
			guests: [],
            guestsAI: 0,
            showModal: false,
			formDone: false,
			scrollValue: 0,
			flags: {
				agreeAll: false,
				getSpam: false
			},
			spamType: 'Электронная почта'
		}),
		computed: {
			isDataEmpty() {
				return this.persons.some(item => item.value.trim() === '')
			},
			hasGuests() {
				return this.guests.some(item => item && item.value !== undefined)
			}, 
			filteredGuests() {
				return this.guests.filter(item => item && item.value !== undefined)
			},
			formReady(){
				return this.flags.agreeAll && !this.isDataEmpty
			},
			fieldDone(){
				return this.persons.filter(field => field.valid === true).length //кол-во полей прошедших валидацию
			},
			progressInputStyles(){
				return { width: this.fieldDone / this.persons.length * 100 + '%' }
			}
		},
		methods: {
			addGuests() {
                this.guests.push({ id: ++this.guestsAI, value: '' });
				this.$nextTick(() => {
					let guests = this.$refs.guests
					guests[guests.length - 1].focus()
				});
			},
			getFullName() {
				const firstName = this.persons.find(item => item.label === 'Фамилия').value
				const lastName = this.persons.find(item => item.label === 'Имя').value
				return `${firstName} ${lastName}`
			},
			shouldShowLabel(person) {
				return person && person.label !== 'Фамилия' && person.label !== 'Имя'
			},
			delGuest(i) {
				this.guests.splice(i, 1)
			},
			sendForm(){ 
				if (!this.isDataEmpty) {
					this.persons.push({ label: 'Full Name', value: this.getFullName() })
                    this.showModal = true
				}
			},
            onConfirm() {
                this.showModal = false
                this.formDone = true
            },
			// это проверка, соответствует ли значение поля ввода заданному регулярному выражению
			validateField(person) {
				person.touched = true; // Помечаем поле как "касались"
				person.valid = person.pattern.test(person.value.trim())
			},
			onSpamTypeUpdate(newSpamType) {
				this.spamType = newSpamType
			},
		},
		mounted(){
			this.$nextTick(() => {
				this.$refs.firstInp[0].focus()
			})
		}
    }
</script>

<template>
    <div class="sample">
        <form v-if="!formDone" @submit.prevent="sendForm" class="mx-1">
            <h2 class="text-center">Заполните форму с пользовательским соглашением</h2><hr>
            <div class="progress">
                <div class="progress-bar" :style="progressInputStyles"></div>
            </div>
            <br>
            <div class="form-group" v-for="(person, i) in persons" :key="i">
                <label class="mb-2">
                    {{ person.label }}

                    <transition 
                        v-if="person.touched" 
                        name="icon" 
                        mode="out-in"  
                        appear 
                        appear-active-class="icon-appear"
                    >
                        <fa-icon 
                            :key="person.valid"
                            :class="person.valid ? 'text-success' : 'text-danger'" 
                            :icon="person.valid ? 'check-circle' : 'exclamation-circle'" 
                        />
                    </transition>
                    
                </label>
                <input 
                    type="text" 
                    class="form-control mb-3" 
                    v-model="person.value" 
                    @input="validateField(person)" 
                    ref="firstInp"
                >
            </div>
            <div class="form-group mb-3">
                <label class="mr-2">Гости</label>
                <input type="button" class="btn btn-primary mx-2" value="+" @click="addGuests">
            </div>
            <transition-group name="fade">
                <div v-for="(guest, i) in guests" :key="guest.id" class="form-group">
                    <label @dblclick="delGuest(i)" class="mb-2">{{ `Гость ${i + 1}` }}</label>
                    <input type="text" class="form-control mb-3" v-model="guest.value" ref="guests" />
                </div>
            </transition-group>
        
            <hr>

            <!-- v-model:scrollValue="scrollValue" - связывает значение переменной scrollValue компонента с входным параметром scrollValue.
            :flags="flags" - передает объект flags в компонент.
            :spamType="spamType" - передает значение переменной spamType в компонент.
            @update:spamType="onSpamTypeUpdate" - прослушивает событие update:spamType и вызывает метод onSpamTypeUpdate при его возникновении.
            :formReady="formReady" - передает значение переменной formReady в компонент. -->

            <UserAgreement 
                v-model:scrollValue="scrollValue"
                :flags="flags"
                :spamType="spamType"
                @update:spamType="onSpamTypeUpdate"
                :formReady="formReady"
            />

        </form>
        <div v-else>
            <h2 class="mt-5 mb-3">Ваши персональные данные</h2>
            <table class="table table-bordered">
                <tbody>
                    <tr v-for="(person, i) in persons" :key="i">
                        <td v-if="shouldShowLabel(person)">{{ person.label }}</td> 
                        <td v-if="shouldShowLabel(person)">{{ person.label === 'Full Name' ? getFullName() : person.value }}</td>
                    </tr>
                    <tr v-if="hasGuests">
                        <td>Гости</td>
                        <td>
                            <table class="table table-bordered">
                                <tbody>
                                    <tr v-for="(guest, i) in filteredGuests" :key="guest.i">
                                        <td>{{ `${i + 1}` }}</td>
                                        <td>{{ guest.value }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>Согласен с соглашением</td>
                        <td :class="flags.agreeAll ? 'text-success' : 'text-danger'">{{ flags.agreeAll ? 'Yes' : 'No' }}</td>
                    </tr>
                    <tr>
                        <td>Получить рассылку</td>
                        <td :class="flags.getSpam ? 'text-success' : 'text-danger'">{{ flags.getSpam ? 'Yes' : 'No' }}</td>
                    </tr>
                    <tr v-if="flags.getSpam">
                        <td>Тип рассылки</td>
                        <td>{{ spamType }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <vue-final-modal v-model="showModal">
			<div class="container p-5 mt-5 bg-white">
				<h3>Проверьте ваши данные</h3>
				<table class="table table-bordered">
                    <tbody>
                        <tr v-for="(person, i) in persons" :key="i">
                            <td v-if="shouldShowLabel(person)">{{ person.label }}</td> 
                            <td v-if="shouldShowLabel(person)">{{ person.label === 'Full Name' ? getFullName() : person.value }}</td>
                        </tr>
                        <tr v-if="hasGuests">
                            <td>Гости</td>
                            <td>
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr v-for="(guest, i) in filteredGuests" :key="guest.i">
                                            <td>{{ `${i + 1}` }}</td>
                                            <td>{{ guest.value }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>Согласен с соглашением</td>
                            <td :class="flags.agreeAll ? 'text-success' : 'text-danger'">{{ flags.agreeAll ? 'Yes' : 'No' }}</td>
                        </tr>
                        <tr>
                            <td>Получить рассылку</td>
                            <td :class="flags.getSpam ? 'text-success' : 'text-danger'">{{ flags.getSpam ? 'Yes' : 'No' }}</td>
                        </tr>
                        <tr v-if="flags.getSpam">
                            <td>Тип рассылки</td>
                            <td>{{ spamType }}</td>
                        </tr>
                    </tbody>
                </table>
				<button class="btn btn-danger" @click="showModal = false">Назад</button>
				<button class="btn btn-success mx-2" @click="onConfirm">Отправить</button>
			</div>
		</vue-final-modal>
    </div>
</template>

<style scoped>
    .sample {
        overflow: hidden;
    }
    
    .fade-enter-active {
        animation: fadeIn 0.5s;
    }

    .fade-leave-active {
        animation: fadeOut 0.5s;
    }

    @keyframes fadeIn {
        from{ opacity: 0; transform: translateX(-100px); }
        to{ opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeOut {
        from{ opacity: 1; transform: translateX(0); }
        to{ opacity: 0; transform: translateX(100px); }
    }

    .icon-enter-active {
		animation: iconIn 0.5s;
	}

	.icon-leave-active {
		animation: iconOut 0.5s;
	}

	.icon-appear {
		animation: iconAppear 0.5s;
	}

	@keyframes iconIn {
		from{ transform: rotateY(-90deg); }
		to{ transform: rotateY(0); }
	}

	@keyframes iconOut {
		from{ transform: rotateY(0); }
		to{ transform: rotateY(90deg); }
	}

	@keyframes iconAppear {
		from{ opacity: 0; }
		to{ opacity: 1; }
	}
</style>
