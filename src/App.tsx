import glslCanvas from "glslCanvas";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

import logo from './logo.svg';
import { getDevicePixelRatio, isWebGlSupported } from "./utils";
import './App.css';

const ShaderCanvas = ({
  width,
  height: ,
  fragShader,
  vertShader,
  uniforms,
  superSample,
  style,
  ...props
}) => {
  const canvas = useRef();
  const sandbox = useRef();
  const webGlSupported = isWebGlSupported();
  const pixelDensity = getDevicePixelRatio();

  // Spawn the glslCanvas
  useEffect(() => {
    if (!webGlSupported && glslCanvas) return;
    sandbox.current = new glslCanvas(canvas.current);
  }, [webGlSupported]);

  // Load the shader if it changes
  useEffect(() => {
    if (!webGlSupported && glslCanvas) return;
    sandbox.current.load(fragShader, vertShader);
  }, [webGlSupported, fragShader, vertShader]);

  //Set the uniforms if the shader or uniforms change
  useEffect(() => {
    if (!webGlSupported && glslCanvas) return;

    // Set the pixel size based on supersample
    sandbox.current.realToCSSPixels = pixelDensity * superSample;

    if (!uniforms) return;
    sandbox.current.setUniforms(uniforms);
  }, [
    pixelDensity,
    webGlSupported,
    fragShader,
    vertShader,
    uniforms,
    superSample
  ]);

  return (
    <canvas
      {...props}
      ref={canvas}
      width={width * pixelDensity * superSample}
      height={height * pixelDensity * superSample}
      style={{
        ...style,
        width: `${width}px`,
        height: `${height}px`
      }}
    />
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
