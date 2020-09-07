
import React, { useState } from 'react';
import './Slider.scss'
import i1 from './img/1.jpg';
import i2 from './img/2.jpg';
import i3 from './img/3.jpg';
import i4 from './img/4.jpg';
import ImgComp from './ImgComp';

function Slider() {
	let sliderArr = [
		<ImgComp src={i4} />,
		<ImgComp src={i2} />,
		<ImgComp src={i3} />,
		<ImgComp src={i1} />,
	]
	const [x, setX] = useState(0)
	const goPrev = () => {
		x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100)
	};
	const goNext = () => {
		x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
	};
	var swipe = function (el, settings) {

		var settings = Object.assign({}, {
			minDist: 60,
			maxDist: 120,
			maxTime: 700,
			minTime: 50
		}, settings);

		if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
		if (settings.maxTime < 100 || settings.minTime < 50) {
			settings.maxTime = 700;
			settings.minTime = 50;
		}

		var el = this.el,
			dir,
			swipeType,
			dist,
			isMouse = false,
			isMouseDown = false,
			startX = 0,
			distX = 0,
			startY = 0,
			distY = 0,
			startTime = 0,
			support = {
				pointer: !!("PointerEvent" in window || ("msPointerEnabled" in window.navigator)),
				touch: !!(typeof window.orientation !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoints" in window.navigator > 1 || "msMaxTouchPoints" in window.navigator > 1)
			};

		var getSupportedEvents = function () {
			switch (true) {
				case support.pointer:
					events = {
						type: "pointer",
						start: "PointerDown",
						move: "PointerMove",
						end: "PointerUp",
						cancel: "PointerCancel",
						leave: "PointerLeave"
					};
					break;
				case support.touch:
					events = {
						type: "touch",
						start: "touchstart",
						move: "touchmove",
						end: "touchend",
						cancel: "touchcancel"
					};
					break;
				default:
					events = {
						type: "mouse",
						start: "mousedown",
						move: "mousemove",
						end: "mouseup",
						leave: "mouseleave"
					};
					break;
			}
			return events;
		};

		var eventsUnify = function (e) {
			return e.changedTouches ? e.changedTouches[0] : e;
		};

		var checkStart = function (e) {
			var event = eventsUnify(e);
			if (support.touch && typeof e.touches !== "undefined" && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
			dir = "none";
			swipeType = "none";
			dist = 0;
			startX = event.pageX;
			startY = event.pageY;
			startTime = new Date().getTime();
			if (isMouse) isMouseDown = true;
			e.preventDefault();
		};

		var checkMove = function (e) {
			if (isMouse && !isMouseDown) return;
			var event = eventsUnify(e);
			distX = event.pageX - startX;
			distY = event.pageY - startY;
			if (Math.abs(distX) > Math.abs(distY)) dir = (distX < 0) ? "left" : "right";
			else dir = (distY < 0) ? "up" : "down";
			e.preventDefault();
		};

		var checkEnd = function (e) {
			if (isMouse && !isMouseDown) {
				isMouseDown = false;
				return;
			}
			var endTime = new Date().getTime();
			var time = endTime - startTime;
			if (time >= settings.minTime && time <= settings.maxTime) {
				if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
					swipeType = dir;
				}
			}
			dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY);

			if (swipeType !== "none" && dist >= settings.minDist) {
				var swipeEvent = new CustomEvent("swipe", {
					bubbles: true,
					cancelable: true,
					detail: {
						full: e,
						dir: swipeType,
						dist: dist,
						time: time
					}
				});
				el.dispatchEvent(swipeEvent);
			}
			e.preventDefault();
		};

		var events = getSupportedEvents();

		if ((support.pointer && !support.touch) || events.type === "mouse") isMouse = true;

		el.addEventListener(events.start, checkStart);
		el.addEventListener(events.move, checkMove);
		el.addEventListener(events.end, checkEnd);

	};
	return (
		<div className="slider">
			{
				sliderArr.map((item, index) => {
					return (
						<div key={index} className="slide" style={{ transform: `translateX(${x}%)` }}>
							{item}
						</div>
					);
				})}
			<button id="goPrev" onClick={goPrev}>
				<i className="fas fa-chevron-left"></i>
			</button>
			<button id="goNext" onClick={goNext}>
				<i className="fas fa-chevron-right"></i>
			</button>
		</div>

	);
}

export default Slider;
