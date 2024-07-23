import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("ProductImageGallery", () => {
  it("should render the images list", () => {
    const imageUrls: string[] = ["url1", "url2"];

    render(<ProductImageGallery imageUrls={imageUrls} />);

    expect(screen.getByRole("list")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

    imageUrls.forEach((imageUrl, index) => {
      expect(images[index]).toHaveAttribute("src", imageUrl);
    });
  });
});
