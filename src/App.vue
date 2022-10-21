<script setup>
import { ref, onMounted, computed, watch } from "vue";
import moment from "moment";
import * as htmlToImage from "html-to-image";
import { toJpeg } from "html-to-image";
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';

function downloadObject() {
    htmlToImage
        .toJpeg(document.getElementById("table-data"), { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement("a");
            link.download = "logs.jpeg";
            link.href = dataUrl;
            link.click();
        });
}
const data_sessions1 = ref([]);

watch(
    data_sessions1,
    (newVal) => {
        localStorage.setItem("data-sessions", JSON.stringify(newVal));
    },
    { deep: true }
);

onMounted(() => {
    data_sessions1.value =
        JSON.parse(localStorage.getItem("data-sessions")) || [];
});
</script>

<template>
    <div class="left-content">
        <div class="timer-group">
            <img src="./assets/timer.png" alt="" srcset="" />
            <input
                type="number"
                name=""
                class="input-minutes"
                id="minutes"
                min="00"
                value="00"
            />
            <span>:</span>
            <input
                type="number"
                name=""
                class="input-seconds"
                id="seconds"
                min="00"
                max="60"
                value="10"
            />
        </div>
        <div class="button-group">
            <button class="add-delete-button" id="minus-button">
                <i class="fa-solid fa-minus"></i>
            </button>
            <button class="add-delete-button" id="plus-button">
                <i class="fa-solid fa-plus"></i>
            </button>
            <button class="start-button green-button" id="start-button">
                <img src="./assets/play-button.png" alt="" srcset="" />
            </button>
        </div>
    </div>
    <div class="right-content">
        <div class="action-group">
            <div class="download-button green-button" @click="downloadObject">
                <i class="fa-solid fa-download"></i> Download logs
            </div>
            <div class="deleteall-button" onclick="deleteAll()">
                <lord-icon
                    src="https://cdn.lordicon.com/gsqxdxog.json"
                    trigger="click"
                    target=".deleteall-button"
                    colors="primary:#121331,secondary:#121331"
                    stroke="85"
                    state="hover-empty"
                >
                </lord-icon>
                Delete all sessions
            </div>
        </div>
        <div class="table-group">
            <table class="table-data" id="table-data">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Started at</th>
                        <th>Duration</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody
                    v-for="(data_session, index) in data_sessions1"
                    v-bind:key="data_session.id"
                >
                    <tr>
                        <td>{{ index + 1 }}</td>
                        <td>
                            {{ data_session.started_at }}<br />
                            <span>{{
                                moment(data_session.time_set).fromNow()
                            }}</span>
                        </td>
                        <td>
                            <b>{{ data_session.duration }}</b> /
                            {{ data_session.time }}
                        </td>
                        <td class="notes-input">
                            <input
                                type="text"
                                v-model="data_session.notes"
                                placeholder="Eat popcorn"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss">
@import "./style.scss";
</style>
