import React, { FC, useEffect, useState } from "react";
import QuoteList from "../elements/list";
import styles from "@styles/home.module.css";

const Home: FC = () => {
  return (
    <div className="container">
      <div className="root_container">
        <div className="main_container">
          <div className={styles.container}>
            <main>
            <header>
              <h1>Welcome to CollabQuotes</h1>
              <p>
                Your one-stop destination to share inspiring quotes, connect
                with like-minded individuals, and build a growing library of
                wisdom.
              </p>
            </header>

            <article >
              <h2>Why You'll Love CollabQuotes</h2>
              <ul>
                <li>
                  📝 Share your original quotes or your favorites from others.
                </li>
                <li>
                  🌟 Explore a wide range of inspirational, funny, and
                  thought-provoking quotes.
                </li>
                <li>
                  🤝 Collaborate and engage with a vibrant community of
                  thinkers.
                </li>
                <li>📚 Create your personal collection of favorite quotes.</li>
              </ul>
            </article>

            <div className={styles.second_container}>
              <h2>Get Started Today</h2>
              <p>
                Whether you're here to share, explore, or simply be inspired,
                CollabQuotes has something for everyone. Let’s build a world of
                meaningful words together.
              </p>
              <a href="#">Add a Quote</a>
              <a href="#">Explore Quotes</a>
            </div>

            <div className="quote_highlight">
              <h2>Quote of the Day</h2>
              <blockquote>
                "The best way to predict the future is to create it." – Peter
                Drucker
              </blockquote>
            </div>
            </main>

            <footer >
              <p>
                &copy; 2024 CollabQuotes. All rights reserved. Let your words
                inspire the world.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
