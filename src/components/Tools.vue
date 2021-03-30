<template>
  <div class="tools_wrapper">
    <div class="input_wrapper">
      <label for="size">Size</label>
      <input
        id="size"
        type="number"
        @change="$emit('stroke', size)"
        min="1"
        max="200"
        :autocomplete="size"
        v-model="size"
      />
    </div>

    <div class="input_wrapper">
      <label for="color">Color</label>
      <input
        class="color_input"
        id="color"
        type="color"
        @change="setColor"
        v-model="color"
      />
      <span>{{ color }}</span>
    </div>
    <div class="btn_wrapper">
      <button
        :class="{ active: tool === `${button.name}` }"
        v-for="(button, index) in buttons"
        :key="index"
        class="tool_btn"
        @click="select(button.name)"
      >
        <img :src="button.icon" alt="" width="30px" height="auto" />
        <span>{{ button.placeholder }}</span>
      </button>
    </div>
    <p>Tool: {{ tool }}</p>
    <div class="main_buttons">
      <button
        :class="{ active: tool === `${button.name}` }"
        v-for="(button, index) in mainButtons"
        :key="index"
        class="main_btn"
        @click="$emit(button.event)"
      >
        <img :src="button.icon" alt="" width="30px" height="auto" />
        <span>{{ button.placeholder }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      size: 3,
      color: "#000000",
      tool: "brush",
      buttons: [
        {
          name: "brush",
          placeholder: "Brush",
          icon: require("../assets/brush.svg")
        },
        {
          name: "rect",
          placeholder: "Rect",
          icon: require("../assets/rect.svg")
        },
        {
          name: "circle",
          placeholder: "Circle",
          icon: require("../assets/circle.svg")
        },
        {
          name: "line",
          placeholder: "Line",
          icon: require("../assets/line.svg")
        },
        {
          name: "eraser",
          placeholder: "Eraser",
          icon: require("../assets/eraser.svg")
        }
      ],
      mainButtons: [
        {
          name: "share",
          placeholder: "Share",
          icon: require("../assets/share.svg"),
          event: "saveImgs"
        },
        {
          name: "undo",
          placeholder: "Undo",
          icon: require("../assets/undo.svg"),
          event: "undo"
        },
        {
          name: "download",
          placeholder: "Download",
          icon: require("../assets/download.svg"),
          event: "download"
        },
        {
          name: "clear",
          placeholder: "Clear",
          icon: require("../assets/delete.svg"),
          event: "clear"
        }
      ]
    };
  },
  methods: {
    select(value: string): void {
      this.tool = value;
      this.$emit("selectTool", this.tool);
    },
    setColor(): void {
      this.$emit("setColor", this.color);
    }
  }
});
</script>

<style lang="scss" scoped>
.tools_wrapper {
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  .input_wrapper {
    display: flex;
    align-items: center;
    input {
      margin: 5px;
    }
    .color_input {
      cursor: pointer;
      border: 1px solid black;
      border-radius: 20px;
    }
  }
  .btn_wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .tool_btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      border: none;
      border-radius: 16px;
      padding: 6px;
      margin-bottom: 4px;
      background-color: #ec721a;
      transition: 0.4s all;
      color: #fff;
      box-sizing: content-box;
      &:hover,
      :active {
        background-color: #f1893f;
      }
      span {
        margin-left: 5px;
      }
      &.active {
        background-color: #a73306;
      }
    }
  }
  .main_buttons {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
    .main_btn {
      display: flex;
      align-items: center;
      cursor: pointer;
      border: none;
      border-radius: 16px;
      padding: 6px;
      margin-bottom: 4px;
      background-color: #c3b1ee;
      transition: 0.4s all;
      color: #fff;
      box-sizing: content-box;
      &:hover,
      :active {
        background-color: #f1893f;
      }
      span {
        margin-left: 5px;
      }
      &.active {
        background-color: #a73306;
      }
    }
  }
}

@media (max-width: 768px) {
  .tools_wrapper {
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    order: 1;
    .btn_wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      width: 100%;
      .tool_btn {
        padding: 10px;
        margin: 0 4px 0 4px;
        &:hover,
        :active {
          background-color: #f1893f;
        }
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
    .main_buttons {
      flex-direction: row;
      justify-content: center;
      .main_btn {
        margin-right: 5px;
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
