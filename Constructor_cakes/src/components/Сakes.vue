<script>
    export default {
        data(){
            return {
                layers: [], //слои
                layersTypes: {
                    biscuit: {
                        price: 50, //цена
                        label: 'Бисквит'
                    },
                    beze: {
                        price: 100,
                        label: 'Безе'
                    },
                    curd: {
                        price: 60,
                        label: 'Творожный'
                    }
                },
                //начальные значения
                defaultLayer: 'biscuit',
                defaultHeight: 5,
                formDone: false,
            }
        },
        computed: {
            hasLayers(){
                return this.layers.length > 0
            },
            price(){
                let sum = 0

                for(let i = 0; i < this.layers.length; i++){
                    let ltype = this.layersTypes[this.layers[i].type]
                    sum += this.layers[i].height * ltype.price
                }

                return sum
            },
            layerStyle: () => (layer) => ({
                height: layer.height * 10 + 'px'
            }),
        },
        methods: {
            // добавляем слой
            addLayer(){
                this.layers.push({ 
                    type: this.defaultLayer, 
                    height: this.defaultHeight 
                })
            },
            // удаляем слой
            removeLayer(i){
                this.layers.splice(i, 1)
            },
            // увеличение высоты для слоя 
            increaseHeight(index) {
                this.layers[index].height++
            },
            // уменьшение высоты для слоя 
            decreaseHeight(i) {
                if (this.layers[i].height > 1) {
                    this.layers[i].height -= 1
                }
            },
            sendForm(){ 
                this.formDone = true
              
            }
        }
    }
</script>

<template>
    <div>
        <div v-if="!formDone">
            <h2 class="text-center">Соберите торт на заказ</h2>
            <hr>
            <div class="text-center">
                <button type="button" class="btn btn-primary" @click="addLayer">Добавить слой</button>
            </div>
            <hr v-show="hasLayers">
            <div class="row align-items-center">
                <div class="col-12 col-lg-4 mb-3 mb-lg-0">
                    <div v-for="(layer, i) in layers" :key="i">
                        <div 
                            :class="'layer layer-enter-active layer-' + layer.type"
                            :style="layerStyle(layer)"
                            @click="increaseHeight(i)"
                            @contextmenu.prevent="decreaseHeight(i)"
                        ></div>
                    </div>
                </div>
                <div class="col-12 col-lg-8">
                    <table class="table table-bordered" v-show="hasLayers">
                        <tbody>
                            <tr class="text-center">
                                <th>Тип (бисквит/безе/творожный)</th>
                                <th>Высота слоя</th>
                                <th>Цена за штуку</th>
                                <th>Общая цена за слой</th>
                                <th>Удалить</th>
                            </tr>
                            <tr v-for="(layer, i) in layers" :key="i">
                                <td>
                                    <select class="form-select" v-model="layer.type">
                                        <option v-for="(info, type) in layersTypes" :value="type" :key="type">
                                            {{ info.label }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model.number="layer.height">
                                </td>
                                <td class="text-center">{{ layersTypes[layer.type].price }} ₽</td>
                                <td class="text-center">{{ layer.height * layersTypes[layer.type].price }} ₽</td>
                                <td class="text-center">
                                    <button type="button" class="btn btn-danger" @click="removeLayer(i)">X</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-show="hasLayers">
                <hr>
                <div class="alert alert-success d-flex justify-content-center">
                    <span class="price">Итоговая сумма: {{ price }} ₽</span>
                    <button type="button" class="btn btn-warning" @click="sendForm">Заказать!</button>
                </div>
            </div>
            <hr>
        </div>
        
        <div v-else>
            <h2 class="mb-3">Ваш торт</h2>
            <table class="table table-bordered">
                <tbody>
                    <tr class="text-center">
                        <th>Тип слоя</th>
                        <th>Высота слоя</th>
                        <th>Цена за штуку</th>
                        <th>Общая цена за слой</th>
                    </tr>
                    <tr v-for="(layer, i) in layers" :key="i" class="text-center">
                        <td>{{ layersTypes[layer.type].label }}</td>
                        <td>{{ layer.height }}</td>
                        <td>{{ layersTypes[layer.type].price }} ₽</td>
                        <td>{{ layer.height * layersTypes[layer.type].price }} ₽</td>
                    </tr>
                    <tr>
                        <th colspan="3">Общая сумма торта</th>
                        <th class="text-center">{{ price }} ₽</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .layer {
        transition: height 0.5s;
    }

    .layer-biscuit {
        background: url(../assets/img/biscuit.jpg);
    }

    .layer-beze {
        background: url(../assets/img/beze.jpg);
    }

    .layer-curd {
        background: url(../assets/img/curd.jpg);
    }

    .price {
        font-size: 26px;
        margin-right: 40px;
    }

    .layer-enter-active {
        animation: layerIn 0.5s;
    }

    @keyframes layerIn {
        from{transform: translateY(50px);}
        to{transform: translateY(0);}
    }
</style>
