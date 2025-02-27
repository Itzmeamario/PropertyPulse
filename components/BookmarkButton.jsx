'use client';

import { useState, useEffect } from 'react';
import bookmarkProperty from '@/app/actions/bookmarkProperty';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';
import { toast } from 'react-toastify';
import { FaBookmark } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarkStatusButton = async () => {
      try {
        const res = await checkBookmarkStatus(property._id);
        if (res.isBookmarked) {
          setIsBookmarked(res.isBookmarked);
        }
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    checkBookmarkStatusButton();
  }, [property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    if (!userId) {
      toast.error('You need to be signed in to bookmark a listing');
      return;
    }

    try {
      const res = await bookmarkProperty(property._id);
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) return <p className='text-center'>Loading...</p>;

  return isBookmarked ? (
    <button
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2' /> Remove Bookmark
    </button>
  ) : (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handleClick}
    >
      <FaBookmark className='mr-2' /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
