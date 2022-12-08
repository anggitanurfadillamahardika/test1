<template>
  <div class="container">
    <h2 style="text-align:left;padding: 14px">CUSTOMERS</h2>
    <el-button class="mt-4" size="medium" type="primary" @click="onAddItem">Input Baru
    
    </el-button>
    

    <el-table :data="filter" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="first_name" label="FIRST NAME" width="300" />
      <el-table-column prop="email" label="EMAIL" width="300" />
      <el-table-column prop="address" label="ADDRESS" width="250" />
      <el-table-column align="center" prop="action" label="ACTION">

        <template #header>
          <el-input v-model="state.search"  size="small" placeholder="Type to search" />
        </template>

        <template #default="data">
          <el-button size="small" @click="onEditClick(data)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(data)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script setup lang="ts">
import { reactive } from 'vue-demi'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const router = useRouter()
const route = useRoute()

interface Customers {
  id: string
  first_name: string
  email: string
  address: string
}

const state = reactive({
  customers: [],
  // [
  //   {
  //     id: 1,
  //     name: "Bambang",
  //     email: "bambang@mail.com",
  //     address: "Jl.Kenanga",
  //   },
  //   {
  //     id: 2,
  //     name: "Dika",
  //     email: "dika@mail.com",
  //     address: "Jl.Mangga",
  //   },
  //   {
  //     id: 3,
  //     name: "Agus",
  //     email: "agus@mail.com",
  //     address: "Jl.Mataram",
  //   }],
  updateSubmit: false,
  search : ''
})


const onAddItem = () => {
  router.push({ path: '/customer-form' })
}

const onLoad = () => {
  let result = axios
    .get("https://reqres.in/api/users")
    .then(result => {
      state.customers = result.data.data
    })
    .catch(error => {
      console.log(error);
    })
}
onLoad();

const onEditClick = (data) => {
  router.push({
    path: '/edit-form/' + data.row.id
  })
  state.updateSubmit = true
  // console.log(data.row)
}

const handleDelete = (data) => {
  if (confirm("Do you really want to delete?")) {
    axios.delete(`https://reqres.in/api/users/${data.row}`)
      .then(() => {
        let index = state.customers.indexOf(data.row)
        state.customers.splice(index, 1)
      }).catch(error => {
        console.log(error)
      })
  }
}

const filter = computed(() => {
    if (state.search) {
        return state.customers.filter((data) => {
            return state.search
                .toLowerCase()
                .split(" ")
                .every((v) => data.first_name.toLowerCase().includes(v));
        });
    } else {
        return state.customers;
    }
});
</script>

<style>

</style>


