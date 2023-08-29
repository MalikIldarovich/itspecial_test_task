<template>
  <section class="textarea-page">
    <div class="textarea-page-container container">
      <div class="textarea-page">
        <Typography
          title="Текстовая область"
          variant="h3"
          color="light"
          weight="bold"
          align="left"
        />
        <div class="textarea-description-lists">
          <ul class="textarea-description-list">
            <li>Цели задания:</li>
            <li>Реализовать кастомный скроллбар</li>
            <li>
              Эффект прозрачности в верхней области, при появлении скролла
            </li>
            <li>Анимация лэйбла</li>
          </ul>
        </div>
      </div>
      <div class="textarea-page-bottom">
        <div class="textarea-page-field">
          <button class="copypaste-btn paste" @click="pasteText">
            <box-icon name="paste" type="solid" color="white"></box-icon>
          </button>
          <button class="copypaste-btn delete" @click="value = ''">
            <box-icon name="trash-alt" type="solid" color="white"></box-icon>
          </button>
          <Textarea
            :value="value"
            name="textarea"
            label="Ваше сообщение"
            @update:value="onInputUpdate"
          />
        </div>
        <div class="textarea-page-actions">
          <div class="texarea-bottom-title">
            <button class="copypaste-btn copy" @click="copyText">
              <box-icon name="copy" type="solid" color="white"></box-icon>
            </button>
            <Typography
              title="Скопируйте текст и вставьте в поле сообщения"
              variant="h6"
              color="primary"
              weight="bold"
              align="left"
            />
          </div>
          <p class="example-text">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas optio
            animi eveniet quo vitae excepturi, maiores neque reiciendis
            quibusdam commodi adipisci esse deserunt officiis consequatur alias
            nisi, dicta provident debitis! Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Nesciunt dicta ipsa aspernatur
            voluptatem sequi maiores ipsam fugiat dolore vel, accusamus pariatur
            sed, sapiente velit eum sint. Maiores sequi eos, dolorem fugit dolor
            numquam at unde odit debitis amet consectetur aliquid molestiae
            dicta eum facere voluptatibus culpa! Expedita eos, sed aspernatur
            autem earum inventore. Blanditiis cum eligendi ab repudiandae itaque
            excepturi voluptates, molestias ullam maiores incidunt amet iste
            magnam repellat veniam accusamus tenetur, adipisci labore? Qui,
            similique. Aliquid, optio saepe magni officiis tempore incidunt quo
            voluptatem, quas eum, itaque maxime. Deleniti eaque, in esse
            repellat dolore quasi architecto modi harum odit!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Textarea from "@ui/Textarea.vue";
import Typography from "@ui/Typography.vue";
import "boxicons";

const value = ref("");
const textToCopy = ref("");

function copyText() {
  const exampleText = document.querySelector(".example-text");
  if (exampleText?.textContent != null) {
    textToCopy.value = exampleText?.textContent;
  }
}

function pasteText() {
  value.value = value.value.concat(textToCopy.value);
}

function onInputUpdate(text: string) {
  value.value = text;
}
</script>

<style lang="scss" scoped>
@import "@assets/css/variables.scss";

.textarea-page-top {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 80%;
}
.textarea-page-group {
  display: flex;
  align-items: center;
  gap: 24px;
}
.textarea-description-lists {
  display: flex;
  align-items: start;
  gap: 24px;
  margin-top: 24px;
}
.textarea-description-list {
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  padding-inline: 16px;

  & > li:first-child {
    color: $primary-color;
    font-size: $fz-lg;
    font-weight: 700;
    list-style: none;
  }
  & > li {
    list-style: disc;
  }
}
.textarea-page-bottom {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}
.textarea-page-field {
  position: relative;
  width: 50%;
}
.texarea-bottom-title {
  display: flex;
  align-items: center;
  gap: 8px;
}
.textarea-page-actions {
  max-width: 50%;
}
.copypaste-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  box-shadow: $shadow-main;
  padding: 4px;
  &:hover {
    opacity: 0.7;
  }
  &:focus {
    border: none;
    outline: none;
  }
  &.copy {
    background-color: $primary-color;
  }
  &.paste {
    background-color: $secondary-color;
  }
  &.delete {
    background-color: $error-color;
  }
}
.paste {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 100;
}
.delete {
  position: absolute;
  top: 12px;
  right: 48px;
  z-index: 100;
}
.example-text {
  font-size: $fz-sm;
  font-style: italic;
  color: $light-gray-color;
  margin-top: 24px;
}
@media (max-width: $lg) {
  .textarea-page-bottom {
    flex-direction: column;
    gap: 16px;
  }
  .textarea-page-field {
    width: 100%;
    order: 1;
  }
  .textarea-page-actions {
    max-width: 100%;
  }
}
</style>
