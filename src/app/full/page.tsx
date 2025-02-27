import LightboxFull from '../../components/LightboxFull';

// Sample gallery images
const galleryImages = [
  '/wedding-photo.png',
  'https://placehold.co/834x516/3E688A/FFF?text=Wedding+Photo+2',
  'https://placehold.co/834x516/8A3E68/FFF?text=Wedding+Photo+3',
  'https://placehold.co/834x516/688A3E/FFF?text=Wedding+Photo+4',
  'https://placehold.co/834x516/8A683E/FFF?text=Wedding+Photo+5'
];

export default function FullPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <LightboxFull
        title="GOLDEN BACHELOR'S WEDDING PHOTOS"
        subtitle="TEST OF THE WORLD"
        imageUrl="/wedding-photo.png"
        photoCredit="Photo: Disney"
        description="This is a caption section to show how a description should look on a galleries lightbox moving forward. This section should also be about three lines long and not exceed three lines. If it were to exeed three lines it will elipsis..."
        currentPage={1}
        totalPages={27}
        images={galleryImages}
      />
    </main>
  );
} 