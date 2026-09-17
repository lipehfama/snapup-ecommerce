<script setup lang="ts">
import { ref } from "vue";

const activeQuestion = ref<number | null>(null);

const questions = [
  {
    question: "Is SnapUp a real ecommerce store?",
    answer:
      "SnapUp is an open-source experimental ecommerce project created to explore a complete shopping experience."
  },
  {
    question: "Are purchases and payments real?",
    answer:
      "No. Product and checkout flows are provided for demonstration and learning purposes only."
  },
  {
    question: "How does registration work?",
    answer:
      "Registration is part of the interface demonstration. You can explore the account flow without sharing payment details."
  },
  {
    question: "Where can I follow the mobile project?",
    answer: "The mobile app lives in the same open-source repository as the web project."
  }
];

const toggleQuestion = (index: number) => {
  activeQuestion.value = activeQuestion.value === index ? null : index;
};
</script>

<template>
  <main class="support-page">
    <div class="container support-page__container">
      <section class="support-hero content-panel" aria-labelledby="support-title">
        <span class="section-marker" aria-hidden="true"></span>
        <h1 id="support-title">Support Center</h1>
        <p>
          Welcome to SnapUp! Find answers to your questions and get the help you need to make the
          most of our platform.
        </p>
      </section>

      <section class="help-cards" aria-label="Support topics">
        <article class="help-card content-panel">
          <i class="help-card__icon bi bi-person-fill" aria-hidden="true"></i>
          <h2>Account &amp; Login</h2>
          <p>Learn how to create an account, log in, and manage your profile.</p>
          <a href="#faq" class="help-card__link"
            >Learn more <i class="bi bi-arrow-right" aria-hidden="true"></i
          ></a>
        </article>
        <article class="help-card content-panel">
          <i class="help-card__icon bi bi-cart-fill" aria-hidden="true"></i>
          <h2>Shopping &amp; Cart</h2>
          <p>
            Find out how to browse products, add items to your cart, and complete your purchase.
          </p>
          <a href="#faq" class="help-card__link"
            >Learn more <i class="bi bi-arrow-right" aria-hidden="true"></i
          ></a>
        </article>
        <article class="help-card content-panel">
          <i class="help-card__icon bi bi-shop" aria-hidden="true"></i>
          <h2>Seller Center</h2>
          <p>Get information for sellers, including how to list products and manage your store.</p>
          <a href="#faq" class="help-card__link"
            >Learn more <i class="bi bi-arrow-right" aria-hidden="true"></i
          ></a>
        </article>
      </section>

      <section id="faq" class="faq content-panel" aria-labelledby="faq-title">
        <span class="section-marker" aria-hidden="true"></span>
        <h2 id="faq-title">Frequently Asked Questions</h2>
        <ul class="faq__items">
          <li v-for="(item, index) in questions" :key="item.question" class="faq-item">
            <button
              type="button"
              class="faq-item__trigger"
              :aria-expanded="activeQuestion === index"
              :aria-controls="`faq-answer-${index}`"
              @click="toggleQuestion(index)"
            >
              <span>{{ item.question }}</span
              ><i
                class="bi bi-chevron-down"
                :class="{ 'is-open': activeQuestion === index }"
                aria-hidden="true"
              ></i>
            </button>
            <p
              v-show="activeQuestion === index"
              :id="`faq-answer-${index}`"
              class="faq-item__answer"
            >
              {{ item.answer }}
            </p>
          </li>
        </ul>
      </section>

      <section class="support-cta content-panel" aria-labelledby="help-title">
        <header class="support-cta__heading">
          <i class="support-cta__icon bi bi-life-preserver" aria-hidden="true"></i>
          <h2 id="help-title">Still need help?</h2>
          <p>Check out our GitHub repository or report an issue. We'd love to hear from you!</p>
        </header>
        <nav class="support-cta__actions" aria-label="Support resources">
          <a
            class="button button--primary"
            href="https://github.com/lipehfama/snapup-ecommerce"
            target="_blank"
            rel="noreferrer"
            ><i class="bi bi-github" aria-hidden="true"></i> View GitHub Repository</a
          >
          <a
            class="button button--outline"
            href="https://github.com/lipehfama/snapup-ecommerce/issues"
            target="_blank"
            rel="noreferrer"
            ><i class="bi bi-exclamation-triangle-fill" aria-hidden="true"></i> Report an Issue</a
          >
        </nav>
      </section>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "./Support.scss";
</style>
