<template>
  <div>
    <form @submit.prevent="add">
        <input type="hidden" v-model="state.form.id">
        <input type="text" v-model="state.form.name">
        <button type="submit" v-show="!state.updateSubmit">add</button>  
        <button type="button" v-show="state.updateSubmit" @click="onUpdate(form)">Update</button> 
    </form>
    <ul v-for="user in state.users" :key="user.id">
      <li>
      <span>{{user.name}}</span> &#160;
      <button @click="onEdit(user)">Edit</button> ||  <button @click="onDel(user)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */ 
import {reactive} from 'vue-demi'
import axios from 'axios'

  const state = reactive ({
    form: {
      id: '',
      name: ''
    },
    users: '',
    updateSubmit: false
    })

 const onLoad = () => {
  let result = axios
    .get("https://reqres.in/api/users")
    .then(result => {
      state.form = result.data.data
    })
    .catch(error => {
      console.log(error);
    })
}

const onAdd = () => {
      axios.post('https://reqres.in/api/users/', state.form).then(res => {
          state.form.name = ''
      })
    }

const onEdit = (user) => {
        state.updateSubmit = true
        state.form.id = user.id 
        state.form.name = user.name 
    }

const  onUpdate = (form) => { 
       return axios.put('https://reqres.in/api/users/' + form.id , {name: state.form.name}).then(res => {
        state.form.id = ''
        state.form.name = ''
        state.updateSubmit = false
      }).catch((err) => {
        console.log(err);
        
      })
    }


const onDel = (user) => {
      axios.delete('https://reqres.in/api/users/' + user.id).then(res =>{
          let index = state.users.indexOf(state.form.name)
          state.users.splice(index,1)
      })
    }

onLoad();
</script>


<style>

</style>