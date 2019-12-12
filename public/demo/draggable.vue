<template>
    <div id="draggable">
        <h1>拖拽排序demo</h1>

        <draggable
            class="sortComponent"
            v-model="sortList"
            group="people"
            @start="drag=true"
            @end="drag=false"
        >
            <p v-for="(item,index) in sortList" :key="index" ></p>
        </draggable>
    </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    name: 'draggable',
    components: {draggable},
    data() {
        return {
            sortList: []
        };
    },
    method: {}
}
</script>