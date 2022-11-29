import React from 'react';
import Navbar from "../navbar/Navbar"

const Home = () => {
  return (
    <>
      <Navbar />
      <>
        <h1>Urban waste collection aid - UWC 2.0</h1>
        <h3>Member</h3>
        <main className="member-list">
          <ol>
            <li>Đỗ Huy Hoàng - 2013219</li>
            <li>Lê Nguyên Hùng - 2013360</li>
            <li>Lê Anh Huy - 2013293</li>
            <li>Nguyễn Đức Huy - 2013307</li>
            <li>Nguyễn Lương Gia Huy - 2013314</li>
            <li>Lê Duy Khang - 2013425</li>
            <li>Đặng Nguyên Phúc - 2014155</li>
          </ol>
        </main>
      </>
    </>
  )
}

export default Home