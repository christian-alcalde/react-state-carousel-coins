import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";



it("smoke test", function () {
  render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
});

it("matches snapshot", function () {
  const { container } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);

  expect(container).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

});



it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  // move backwards in the carousel
  const leftArrow = container.querySelector(".fa-chevron-circle-left");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

});


it("left arrow missing on first image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const leftArrow = container.querySelector(".fa-chevron-circle-left");

  expect(leftArrow).toBeFalsy();
});

it("right arrow missing on last image", function () {
  const { container, debug } = render(
    <Carousel
      photos={[TEST_IMAGES[0]]}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector(".fa-chevron-circle-right");

  expect(rightArrow).toBeFalsy();
});

it("both arrows missing on single image", function () {
  const { container} = render(
    <Carousel
      photos={[TEST_IMAGES[0]]}
      title="images for testing"
    />
  );
  const rightArrow = container.querySelector(".fa-chevron-circle-right");
  const leftArrow = container.querySelector(".fa-chevron-circle-left");

  expect(rightArrow).toBeFalsy();
  expect(leftArrow).toBeFalsy();
});
