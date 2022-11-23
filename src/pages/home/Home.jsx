import React from 'react';
import './Home.css';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import Timeline from '../../components/timeline/TimeLine';

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Timeline />
        <Rightbar />
      </div>
    </>
  );
}
