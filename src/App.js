import React, { useState, useEffect } from 'react';
import { useInput } from './hooks/useInput';
import './App.css';
import { palettePicker } from './PalettePicker';
import images from './DefaultImages';

const getRandomElFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

function App() {
  const [palette, setPalette] = useState(null);
  const [photo, setPhoto] = useState(getRandomElFromArr(images));

  const { value: userImageLink, bind, reset } = useInput('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (userImageLink && userImageLink.startsWith('https://')) {
      setPhoto(userImageLink);
      reset();
    } else {
      reset();
    }
  };

  useEffect(() => {
    palettePicker(photo).then((palette) => {
      const ColorPalette = {};
      for (let key in palette) {
        const { hex, rgb } = palette[key];
        ColorPalette[key] = { hex, rgb };
      }
      setPalette(ColorPalette);
    });
  }, [photo]);

  const imageHeight = 80;
  const dimensionToVmin = (d) => d + 'vmin';

  return (
    palette && (
      <div className='App'>
        <section className='App-header'>
          <form onSubmit={handleSubmit}>
            <label style={{ color: palette.LightVibrant.hex }}>
              {' '}
              Add an image link from{' '}
              <a
                href='https://unsplash.com/'
                target='_blank'
                rel='noreferrer'
                style={{ color: palette.Vibrant.hex, fontWeight: 'bold' }}
              >
                Unsplash
              </a>{' '}
              (open source) to generate theme colors. &nbsp;
              <input type='text' placeholder='image link' {...bind} />
            </label>
            &nbsp;
            <input type='submit' value='✅' />
            <button
              className='reload-image'
              onClick={() => setPhoto(getRandomElFromArr(images))}
            >
              🔄
            </button>
          </form>
          <div className='wrapper'>
            <img
              src={photo}
              alt='extracterImage'
              style={{ height: dimensionToVmin(imageHeight) }}
            />
            <div>
              {palette &&
                Object.keys(palette).length &&
                Object.keys(palette).map((k) => (
                  <div
                    className='swatch'
                    key={k}
                    style={{
                      background: palette[k].hex,
                      width: dimensionToVmin(imageHeight / 6),
                      height: dimensionToVmin(imageHeight / 6),
                      lineHeight: dimensionToVmin(imageHeight / 6),
                    }}
                  >
                    {palette[k].hex}
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default App;
