import './App.css';
import React, { useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { political_data_map } from './data';
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import VibeMeter from './VibeMeter';

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center w-screen h-screen p-5 bg-black bg-opacity-50">
      {children}
    </div>
  );
};

const PoliticalLeaningChart = ({ currentSubreddit, data }) => {
  return (
    <div className='w-full h-full px-1 py-6 sm:p-10'>
      <h2 className='mb-5 text-xl font-bold text-center'> {currentSubreddit} Political Leaning Chart </h2>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data} stackOffset="expand" margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Area type="monotone" stackId={1} dataKey="left" stroke="#0000ff" fill="#0cadff" />
          <Area type="monotone" stackId={1} dataKey="right" stroke="#ff0000" fill="#ff5046" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis domain={[0.0, 1.0]} stroke="#fff" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const PoliticalLeaningChartModal = ({ currentSubreddit, data, onClose }) => {
  return (
    <div className="w-full h-full p-5 overflow-auto text-white rounded-lg bg-neutral-800">
      <button className="float-right p-2 text-white" onClick={onClose}><IoIosClose size={"30px"} />
      </button>
      <PoliticalLeaningChart currentSubreddit={currentSubreddit} data={data} />
    </div>
  );
}



const LastUpdated = ({ lastUpdated }) => {
  return (
    <>
      <h2 className='text-2xl text-gray-500 center'> Last Data Refresh:  </h2>
      <p className='text-2xl text-white center'> {lastUpdated} </p>
    </>
  );
}

const TrendingPoliticians = ({trendingPoliticians}) => {
  return (
    // list of politicians
    <div className='flex flex-col items-center justify-center w-full h-full p-5'>
      <FaArrowTrendUp size="50px" />
      <h2 className='text-xl font-bold text-center'> Trending Politicians </h2>
      <table className='w-full p-2 text-center'>
        <tr>
          <th> Politician </th>
          <th> Sentiment </th>
        </tr>
        {
          trendingPoliticians.map((politician) => (
            <tr>
              <td> {politician.name} </td>
              <td> {politician.sentiment} </td>
            </tr>
          ))
        }
      </table>
    </div>
  );
}

const PostsScanned = ({ posts }) => {
  return (
    <div className='w-full h-full p-5'>
      <h2 className='mb-3 text-xl font-bold text-center'> Posts Scanned Today </h2>
      <p className='font-bold text-center text-8xl'> {posts} </p>
    </div>
  );
}

const LearnMore = () => {
  return (
    <div className='w-full h-full p-3'>
      <h2 className='mb-3 text-3xl font-bold text-center'> Learn More </h2>
    </div>
  );
}

const LearnMoreModalContent = ({ onClose }) => {
  return (
    <div className="p-5 overflow-auto text-white rounded-lg max-w-[600px] bg-neutral-800">
      <button className="float-right p-2 text-white" onClick={onClose}><IoIosClose size={"30px"} />
      </button>
      <div className='w-full h-full p-3'>
        <h2 className='mb-3 text-3xl font-bold text-center'> Learn More </h2>
        <div className='my-4'>
          <p> The r/politics dashboard serves as a tool to quickly gather what parties and sentiments are being discussed on an affluent social media site like Reddit. </p>
          <p>
            Developed for JumboHack 2024, this tool uses data gathered from discussion boards, and analyzes this data for political and social sentiment using a trained ML model.
          </p>
          <p>
            It was designed to help users comprehend news quickly on a community-driven site like Reddit, this dashboard serves to get an overview of current political trends by day, and how real people feel about ongoing events.
          </p>
        </div>
        <div className='flex justify-between'>
          <span className='text-sm'> Created by: Marco P., Jimmy M., Elisa Y., Zack W., Hannah J. </span>
          <span className='text-sm font-bold'> JumboHack 2024 </span>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [currentSubreddit, setCurrentSubreddit] = useState('r/Politics');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const currentPoliticalData = political_data_map[currentSubreddit];
  const boxes = [
    { id: 1, rowSpan: 4, colSpan: 2, content: <PoliticalLeaningChart currentSubreddit={currentSubreddit} data={currentPoliticalData} />, modalContent: <PoliticalLeaningChartModal currentSubreddit={currentSubreddit} data={currentPoliticalData} onClose={closeModal} /> },
    { id: 2, rowSpan: 2, colSpan: 1, content: <LastUpdated lastUpdated={"12:00 am on 2/18/2024"} />, modalContent: null },
    { id: 3, rowSpan: 3, colSpan: 1, content: <TrendingPoliticians trendingPoliticians={currentPoliticalData[currentPoliticalData.length - 1]["trending_politicians"]}/>, modalContent: null },
    { id: 4, rowSpan: 2, colSpan: 1, content: <PostsScanned posts={currentPoliticalData[currentPoliticalData.length - 1]["posts"]} />, modalContent: null },
    { id: 5, rowSpan: 2, colSpan: 1, content: <VibeMeter vibe={currentPoliticalData[currentPoliticalData.length - 1]["vibe"]} />, modalContent: null },
    { id: 6, rowSpan: 1, colSpan: 1, content: <LearnMore />, modalContent: <LearnMoreModalContent onClose={closeModal} /> }
  ];


  return (
    <div className='h-full min-h-screen p-5 bg-black'>
      {
        isModalOpen && (
          <Modal>
            {modalContent}
          </Modal>
        )
      }

      <div className='flex flex-row justify-between p-5'>
        <h1 className='text-2xl font-black text-center text-white'> Reddit Political Dashboard </h1>
        {/* dropdown menu to select subreddit */}
        <select
          className='p-2 bg-neutral-800 text-white rounded-md w-[32.5%]'
          value={currentSubreddit}
          onChange={(e) => setCurrentSubreddit(e.target.value)}
        >
          {/* map keys from political_data_map */}
          {Object.keys(political_data_map).map((subreddit) => (
            <option key={subreddit} value={subreddit}> {subreddit} </option>
          ))}
        </select>
      </div>

      <div className="grid auto-rows-[93px] grid-cols-3 gap-4 m-5">
        {boxes.map(box => (
          <div
            key={box.id}
            onClick={box.modalContent != null ? (() => openModal(box.modalContent)) : null}
            className={`transition ease-in-out hover:scale-[102%] ${box.rowSpan === 1 && "row-span-1"} ${box.rowSpan === 2 && "row-span-2"} ${box.rowSpan === 3 && "row-span-3"} ${box.rowSpan === 4 && "row-span-4"} ${box.colSpan === 1 && "md:col-span-1"} ${box.colSpan === 2 && "md:col-span-2"} col-span-3 rounded-xl border-2 border-slate-400/10 p-4 bg-neutral-900 text-white flex items-center justify-center ${box.modalContent != null && 'cursor-pointer'} flex-col`}
          >
            {box.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
