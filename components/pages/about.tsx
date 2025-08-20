import React, { Component } from "react";
import styles from "@styles/about_profile.module.css";
import { useAuth } from "@components/redux/apis/authSlice";
export default function About() {

  const {data,isLogin}=useAuth()
  console.log('data: ', isLogin);

  

  return (
    <div className="main_container">
      <div className={styles.container}>
        <header>
          <h1>About CollabQuotes</h1>
          <span>
            Welcome to <strong>CollabQuotes</strong>, the ultimate platform for
            sharing, discovering, and collaborating on meaningful quotes!
          </span>
          <p>
            At CollabQuotes, we believe that quotes have the power to inspire,
            motivate, and connect people from all walks of life. Whether you're
            a writer, philosopher, thinker, or someone who loves sharing
            meaningful words, this is the perfect space for you to contribute
            your thoughts and find inspiration.
          </p>
        </header>

        <article>
          <h2>What Can You Do on CollabQuotes?</h2>
          <ul>
            <li>
              <strong>Add Your Quotes</strong>: Share your original quotes or
              your favorite ones from others and leave your mark in our growing
              collection.
            </li>
            <li>
              <strong>Explore Wisdom</strong>: Discover a diverse range of
              quotes, from motivational and thought-provoking to funny and
              light-hearted.
            </li>
            <li>
              <strong>Collaborate and Interact</strong>: Engage with other users
              by liking, commenting, and sharing quotes that resonate with you.
            </li>
          </ul>
          <p>
            Join the CollabQuotes community today, where words come alive and
            inspire countless lives. Let’s create a library of wisdom together!
          </p>
          <p>
            <em>Your words have the power to inspire the world.</em>
          </p>
        </article>
      </div>
    </div>
  );
}
