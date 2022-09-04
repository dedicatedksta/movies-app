import React, { RefObject, SetStateAction } from "react";
import Slider from "react-slick";

export default class SliderHandler {
	sliderRef: RefObject<Slider>;
	currentSlide: number;
	setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
	totalLength: number;
	slideLength: number;

	constructor(
		sliderRef: RefObject<Slider>,
		currentSlide: number,
		setCurrentSlide: React.Dispatch<SetStateAction<number>>,
		totalLength: number,
		slideLength: number
	) {
		this.sliderRef = sliderRef;
		this.currentSlide = currentSlide;
		this.setCurrentSlide = setCurrentSlide;
		this.totalLength = totalLength;
		this.slideLength = slideLength;
	}

	previousSlide() {
		if (this.currentSlide > 1) {
			this.sliderRef.current!.slickPrev();
			this.setCurrentSlide(this.currentSlide - 1);
		}
	}

	nextSlide() {
		if (this.currentSlide !== Math.ceil(this.totalLength / this.slideLength)) {
			this.sliderRef.current!.slickNext();
			this.setCurrentSlide(this.currentSlide + 1);
		}
	}
}
