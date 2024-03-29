import '/src/app/globals.css';
import { useState, useRef ,useEffect} from "react";
import { gridList, gridContentData1 } from '/src/app/gridContentData';
import { Icon } from '@iconify/react';

import Link from 'next/link';
import { useRouter } from 'next/router';

const Play = () => {
 const router = useRouter();
  const { id } = router.query;
  const theme = gridList.find(item => item.id === parseInt(id));
const [foundWords, setFoundWords] = useState(0);
  const gridRef = useRef(null);
    const [selectedLetters, setSelectedLetters] = useState([]);
      const [isMouseDown, setIsMouseDown] = useState(false);

        const [foundIndexes, setFoundIndexes] = useState([]);

  const [gridContent, setGridContent] = useState(gridContentData1);
   const maxGroup = gridContent?.reduce((max, { group }) => {
    return group > max ? group : max;
  }, 0);



  const resetSelect = () => {
    setSelectedLetters([]);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };




const submitWord = () => {
  const selectedWordIndexes = [...selectedLetters];

  for (let i = 0; i < gridContent.length; i++) {
    const wordGroup = [];
    let j = i;
    while (
      j < gridContent.length &&
      gridContent[j].group === gridContent[i].group
    ) {
      wordGroup.push(gridContent[j]);
      j++;
    }

    

    const groupIndexes = {};
    gridContent.forEach(({ group, index, position }) => {
      if (!groupIndexes[group]) {
        groupIndexes[group] = [];
      }
      groupIndexes[group].push(index);
    });

    
    for (const group in groupIndexes) {
      groupIndexes[group].sort((a, b) => {
        const posA = gridContent.find(item => item.index === a).position;
        const posB = gridContent.find(item => item.index === b).position;
        return posA - posB;
      });
    }

    
    for (const group in groupIndexes) {
      const groupIndex = groupIndexes[group];
  
    if (
  selectedWordIndexes.length === groupIndex.length &&
  JSON.stringify(selectedWordIndexes) === JSON.stringify(groupIndex) &&
  !wordGroup.some((item) => item.found) &&
  !selectedWordIndexes.some((index) => foundIndexes.includes(index))
) {
   const foundWordIndexes = selectedWordIndexes.map((index) => gridContent[index].index);

        setFoundIndexes([...foundIndexes, ...foundWordIndexes]);
        setFoundWords(foundWords + 1);
        setSelectedLetters([]);
        return; 
      }
    }
  }
  setSelectedLetters([]);

};


const handleClick = (index) => {
  if (!selectedLetters.includes(index)) {
    setSelectedLetters([...selectedLetters, index]);
  }
};
  return (
 
    <main className="flex min-h-screen items-center p-12 flex-col">
 
      <div className="text-3xl font-bold mb-4">Strandimization</div>
          <div className="flex">
             <div className="links">
          <a href="https://www.linkedin.com/in/ryangormican/">
            <Icon icon="mdi:linkedin" color="#0e76a8" width="60" />
          </a>
          <a href="https://github.com/RyanGormican/Strandimization">
            <Icon icon="mdi:github" color="#e8eaea" width="60" />
          </a>
          <a href="https://ryangormicanportfoliohub.vercel.app/">
            <Icon icon="teenyicons:computer-outline" color="#199c35" width="60" />
          </a>
        </div>
<div>
          <Link href="/Puzzles">
            <button className="py-2 px-4 bg-blue-500 text-white rounded">PUZZLES</button>
          </Link>
        </div>
        <div>
          <Link href="/Create">
            <button className="py-2 px-4 bg-blue-500 text-white rounded">CREATE</button>
          </Link>
        </div>
    </div>
      <div className="flex flex-col mb-8">
        <div className="font-bold mb-4 ">Your Theme</div>
        <div>
        {theme  && theme.theme}
        </div>
        <div>
          {foundWords} of {maxGroup} theme words found
        </div>
         <div  style={{ minHeight:"50px",maxHeight: "50px" }}>
        {selectedLetters.length > 0 && (
          <div>
            {selectedLetters.map((index) => (
              <span
                key={index}
                className={
                  foundIndexes.includes(index) ? "bg-blue-200" : ""
                }
              >
                {gridContent[index].letter}
              </span>
            ))}
            <div>
            <button
              className="text-l font-bold mb-8 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
              onClick={submitWord}
            >
              Submit
            </button>
            <button
              className="text-l font-bold mb-8 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out"
              onClick={resetSelect}
            >
              Reset
            </button>
            </div>
          </div>
        )}
        </div>
      </div>
<div
  ref={gridRef}
  className="grid grid-cols-6 grid-rows-8 gap-4"
  onMouseUp={handleMouseUp}
>
  {gridContent &&
    gridContent.map(({ letter, group, position, index }) => (
      <div
        key={index}
        className={` ${
          selectedLetters.includes(index) ? "bg-gray-500" : ""
        }`}
        onClick={() => handleClick(index)}
      >
        <div
          className={foundIndexes.includes(index) ? "bg-blue-200" : ""}
        >
          {letter}
        </div>
      </div>
    ))}
</div>


    </main>
  );
  
}

export default Play;