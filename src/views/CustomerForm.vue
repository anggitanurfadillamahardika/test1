<template>

  <div class="common-layout">
    <el-container>
      <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link :to="{ name: 'customer' }">Customer</router-link></el-menu-item>
      </el-menu> -->

      <el-header>
        <h2 style="text-align:left;padding: 14px" v-show="!state.updateSubmit">INPUT NEW CUSTOMERS</h2>
        <h2 style="text-align:left;padding: 14px" v-show="state.updateSubmit">EDIT CUSTOMERS</h2>
      </el-header>
      <el-main>
        <div class="customer-form">
          <!-- <el-form v-on:submit.prevent="onSubmit" label-width="120px"> -->
          <el-form :model="state.form" label-width="120px">
            <el-form-item label="Id">
              <el-input v-model="state.form.id" />
            </el-form-item>
            <el-form-item label="Name">
              <el-input v-model="state.form.first_name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="state.form.email" />
            </el-form-item>
            <el-form-item label="Address">
              <el-input v-model="state.form.address" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-show="!state.updateSubmit" @click="onSubmit">Save</el-button>
              <el-button type="primary" v-show="state.updateSubmit" @click="onUpdateClick(state.form)">Update</el-button>
              <el-button type="primary"  @click="cancelSubmit">Cancel</el-button>
              <!-- <el-button><router-link :to="{ name: 'customer' }">Cancel</router-link></el-button> -->
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue-demi'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

import axios from 'axios'
const state = reactive({
  form: {
    id: '',
    first_name: '',
    email: '',
    address: '',
  },
  updateSubmit: false
})


const router = useRouter()
const route = useRoute()

const onSubmit = () => {
  axios.post('/users', state.form)
    .then(response => {
      // this.router.push(['/customer']);
      router.push({ path: '/customer' })
      console.log('successfull');
    })
    .catch(error => {
      console.log(error);
    })
  }

  const cancelSubmit = () => {
    router.push({ path: '/customer' })
  }

  const onLoad = () => {
    axios.get (`https://reqres.in/api/users/${route.params.id}`)
    .then(response => {
      console.log(response)
      state.updateSubmit = true
      state.form.id = response.data.data.id
      state.form.first_name = response.data.data.first_name
      state.form.address = response.data.data.address
      state.form.email = response.data.data.email
    }).catch(error => {
      console.log(error.response.data)
    }) 
  }
  onLoad();

const onUpdateClick = async (data) => {
  console.warn(state.form)
  const result = await axios.put(`https://reqres.in/api/users/${route.params.id}`, {
    id: state.form.id,
    first_name: state.form.first_name,
    email: state.form.email,
    address: state.form.address,
  })
  .then(response => {
    router.push({ path: '/customer' })
    state.updateSubmit = true      
  });
}
</script>