<script>
    export default { 
        props: {
            scrollValue: Number,
            flags: Object,
            spamType: String,
            formReady: Boolean,
        },
        computed: {
            progressStyles(){
				return { width: this.scrollValue * 100 + '%' };
			},
            scrollDone(){
				return this.scrollValue > 0.99;
			},
        },
        methods: {
			onScroll(e){
                // В этой функции значение scrollValue обновляется с помощью метода emit, который генерирует событие 
                // update:scrollValue для обновления значения в родительском компоненте
                this.$emit('update:scrollValue', 
                Math.max(this.scrollValue, e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)));
			}
        }
    }
</script>

<template>
    <div class="content alert alert-info" @scroll="onScroll">
        <p>1. ОБЩИЕ ПОЛОЖЕНИЯ</p>
        <p>1.1. Настоящее Пользовательское соглашение (далее – Соглашение) относится к сайту «НАЗВАНИЕ
        САЙТА», расположенному по адресу АДРЕС САЙТА.</p>
        <p>1.2. Сайт «НАЗВАНИЕ САЙТА» (далее – Сайт) является собственностью юридического лица
        ОРГАНИЗАЦИЯ (ОГРН: НОМЕР, ИНН: НОМЕР, адрес регистрации: ЮР.АДРЕС)</p>
        <p>1.3. Настоящее Соглашение регулирует отношения между Администрацией сайта «НАЗВАНИЕ САЙТА»
        (далее – Администрация сайта) и Пользователем данного Сайта.</p>
        <p>2. ОПРЕДЕЛЕНИЯ ТЕРМИНОВ</p>
        <p>2.1. Перечисленные ниже термины имеют для целей настоящего Соглашения следующее значение:</p>
        <p>2.1.1 «НАЗВАНИЕ САЙТА» – Интернет-ресурс, расположенный на доменном имени АДРЕС САЙТА,
        осуществляющий свою деятельность посредством Интернет-ресурса и сопутствующих ему сервисов
        (далее - Сайт).</p>
        <p>2.1.2. «НАЗВАНИЕ САЙТА» – сайт, содержащий информацию о Товарах и/или Услугах и/или Иных
        ценностях для пользователя, Продавце и/или Исполнителе услуг, позволяющий осуществить выбор,
        заказ и (или) приобретение Товара, и/или получение услуги.</p>
        <p>2.1.3. Администрация сайта – уполномоченные сотрудники на управления Сайтом, действующие от
        имени юридического лица ОРГАНИЗАЦИЯ.</p>
        <p>3. ПРЕДМЕТ СОГЛАШЕНИЯ</p>
        <p>3.1. Предметом настоящего Соглашения является предоставление Пользователю доступа к
        содержащимся на Сайте Товарам и/или оказываемым услугам.</p>
        <p>3.1.1. Сайт предоставляет Пользователю следующие виды услуг (сервисов):
         предоставление Пользователю возможности размещения сообщений, комментариев,
        рецензий Пользователей, выставления оценок контенту сайта;
         ознакомление с товарами/услугами, размещенными на Сайте;
         выбор и заказ товаров/услуг для осуществления последующей покупки или оформления на
        данном Сайте.</p>
        <p>4. ПРАВА И ОБЯЗАННОСТИ СТОРОН</p>
        <p>4.1. Администрация сайта вправе:</p>
        <p>4.1.1. Изменять правила пользования Сайтом, а также изменять содержание данного Сайта.
        Изменения вступают в силу с момента публикации новой редакции Соглашения на Сайте.</p>
        <p>5. ИСПОЛЬЗОВАНИЕ САЙТА</p>
        <p>5.1. Сайт и Содержание, входящее в состав Сайта, принадлежит и управляется Администрацией сайта.</p>
        <p>5.2. Содержание Сайта защищено авторским правом, законодательством о товарных знаках, а также
        другими правами, связанными с интеллектуальной собственностью, и законодательством о
        недобросовестной конкуренции.</p>
        <p>6. ОТВЕТСТВЕННОСТЬ</p>
        <p>6.1. Любые убытки, которые Пользователь может понести в случае умышленного или неосторожного
        нарушения любого положения настоящего Соглашения, а также вследствие несанкционированного
        доступа к коммуникациям другого Пользователя, Администрацией сайта не возмещаются.</p>
        <p>7. НАРУШЕНИЕ УСЛОВИЙ ПОЛЬЗОВАТЕЛЬСКОГО СОГЛАШЕНИЯ</p>
        <p>7.1. Администрация сайта имеет право раскрыть информацию о Пользователе, если действующее
        законодательство Российской Федерации требует или разрешает такое раскрытие.</p>
        <p>7.2. Администрация сайта вправе без предварительного уведомления Пользователя прекратить и (или)
        заблокировать доступ к Сайту, если Пользователь нарушил настоящее Соглашение или содержащиеся
        в иных документах условия пользования Сайтом, а также в случае прекращения действия Сайта либо
        по причине технической неполадки или проблемы.</p>
        <p>8. РАЗРЕШЕНИЕ СПОРОВ</p>
        <p>8.1. В случае возникновения любых разногласий или споров между Сторонами настоящего Соглашения
        обязательным условием до обращения в суд является предъявление претензии (письменного
        предложения о добровольном урегулировании спора).</p>
        <p>8.2. Получатель претензии в течение 30 календарных дней со дня ее получения, письменно
        уведомляет заявителя претензии о результатах рассмотрения претензии.</p>
        <p>9. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</p>
        <p>9.1. Администрация сайта не принимает встречные предложения от Пользователя относительно
        изменений настоящего Пользовательского соглашения.</p>
        <p>9.2. Отзывы Пользователя, размещенные на Сайте, не являются конфиденциальной информацией и
        могут быть использованы Администрацией сайта без ограничений.</p>
    </div>
    <div class="progress mb-3">
        <div class="progress-bar" :style="progressStyles"></div>
	</div>

    <div v-if="scrollDone">
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" v-model="flags.agreeAll"> Согласен с соглашением
            </label>
		</div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" v-model="flags.getSpam"> Получать рассылку
            </label>
		</div>
        <div v-if="flags.getSpam">
            <div class="form-check" v-for="(type, i) in ['Электронная почта', 'Номер телефона']" :key="i">
                <label class="form-check-label">
                    <!-- :checked="spamType === type" - устанавливает значение checked в true для выбранного типа спама. -->
                    <!-- @change="emit('update:spamType', type)" - прослушивает событие изменения выбранного типа спама и вызывает 
                        событие update:spamType, передавая новое значение. -->
                    <input
                        class="form-check-input"
                        type="radio"
                        :checked="spamType === type"
                        @change="$emit('update:spamType', type)"
                        :value="type"
                    >
                    {{ type }}
                </label>
            </div>
		</div>
        <hr>
        <button class="btn btn-primary" :disabled="!formReady">Отправить данные</button>

    </div>

</template>

<style scoped>
  .content {
    height: 300px;
    overflow: auto;
  }
</style>
