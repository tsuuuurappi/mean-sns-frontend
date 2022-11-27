import React, { useState } from 'react';
import { useEffect } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './TimeLine.css';
// import { Posts } from '../../dummyData';
import axios from 'axios';

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);

  // 空の配列を渡すことでページ読み込み時１回だけデータを取得するようになる
  useEffect(() => {
    // useEffectのコールバック関数にはasyncは付けられないため、コールバック関数内でasync関数を作成して非同期通信を行う必要がある
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get('/posts/timeline/637d7b94208323cdf1957b03');
      // console.log(response);
      setPosts(response.data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="timeline">
      <div className="timelineWrapper">
        <Share />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
