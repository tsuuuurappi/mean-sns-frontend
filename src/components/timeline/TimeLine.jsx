import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './TimeLine.css';
import axios from 'axios';
import { AuthContext } from '../../state/AuthContext';

export default function TimeLine({ username }) {
  const [posts, setPosts] = useState([]);

  const { user } = useContext(AuthContext);

  // 空の配列を渡すことでページ読み込み時１回だけデータを取得するようになる
  useEffect(() => {
    // useEffectのコールバック関数にはasyncは付けられないため、コールバック関数内でasync関数を作成して非同期通信を行う必要がある
    const fetchPosts = async () => {
      const response = username
        ? await axios.get(`/posts/profile/${username}`) // プロフィールの場合
        : await axios.get(`/posts/timeline/${user._id}`); // ホームの場合
      setPosts(
        response.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

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
