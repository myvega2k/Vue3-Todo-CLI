<template>
    <div>
        <ul>
            <li v-for="(todoItem, idx) in todoItems" :key="idx">
                <i class="fas fa-check checkBtn" :class="{ checkBtnCompleted: todoItem.completed }" 
                @click="toggleComplete(todoItem)"></i>
                <span :class="{ textCompleted: todoItem.completed }">{{ todoItem.item }}</span>
                <span class="removeBtn" @click="removeTodo(todoItem.item, idx)">
                    <i class="fas fa-trash-alt"></i>
                </span>

            </li>
        </ul>

    </div>
</template>

<script setup lang="ts">
import TodoItem from '@/types/TodoItem';
import { ref, onBeforeMount } from 'vue'

const todoItems = ref<TodoItem[]>([])

//life cycle hook
onBeforeMount(() => {
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            const storageKey = localStorage.key(i) as string
            const itemJson = localStorage.getItem(storageKey);
            todoItems.value.push(JSON.parse(itemJson as string));
        }
    }
    console.log(todoItems.value)
})

const removeTodo = (todoItemStr: string, index: number) => {
    localStorage.removeItem(todoItemStr)
    todoItems.value.splice(index, 1)
}

const toggleComplete = (todoItem: TodoItem) => {
    const { item, completed } = todoItem
    todoItem.completed = !completed;
    localStorage.removeItem(item);
    localStorage.setItem(item, JSON.stringify(todoItem));
}


</script>

<style scoped>
i,
span {
    cursor: pointer;
}

ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.removeBtn {
    margin-left: auto;
    color: #de4343;
}

.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}

.checkBtnCompleted {
    color: #b3adad;
}

.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>