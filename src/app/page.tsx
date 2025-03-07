import Lightbox from '../components/Lightbox';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <Lightbox
        title="GOLDEN BACHELOR'S WEDDING PHOTOS"
        subtitle="TEST OF THE WORLD"
        imageUrl="/wedding-photo.png"
        photoCredit="Photo: Disney"
        description="This is a caption section to show how a description should look on a galleries lightbox moving forward. This section should also be about three lines long and not exceed three lines. If it were to exeed three lines it will elipsis..."
        currentPage={1}
        totalPages={27}
      />
    </main>
  );
}
