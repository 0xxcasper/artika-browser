import React from 'react';
import { useAllArtwalkCategories, useArtwalkCategory, useArtwalkContent } from '@/hooks/useArtwalk';

export default function ArtwalkTestNew() {
  const { categories, loading: categoriesLoading, error: categoriesError } = useAllArtwalkCategories();
  const { category, loading: categoryLoading, error: categoryError } = useArtwalkCategory('outdoor-sculpture-park');
  const { content, loading: contentLoading, error: contentError } = useArtwalkContent('breathing-guidance');

  if (categoriesLoading) return <div>Loading categories...</div>;
  if (categoriesError) return <div>Error loading categories: {categoriesError}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Artwalk Test - New 3-Custom-Type Structure</h1>
      
      <h2>All Categories ({categories.length})</h2>
      {categories.map((cat) => (
        <div key={cat.slugId} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{cat.title}</h3>
          <p><strong>Slug ID:</strong> {cat.slugId}</p>
          <p><strong>Description:</strong> {cat.description}</p>
          <p><strong>Contents:</strong> {cat.contents.length} items</p>
          
          {cat.contents.map((item) => (
            <div key={item.id} style={{ margin: '10px', padding: '10px', backgroundColor: '#f5f5f5' }}>
              <h4>{item.name}</h4>
              <p><strong>Sub Name:</strong> {item.subName}</p>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Thumbnail:</strong> {item.thumb ? '✅' : '❌'}</p>
              <p><strong>Detail:</strong> {item.detail.title ? '✅' : '❌'}</p>
              <p><strong>Detail Images:</strong> {item.detail.images.length} images</p>
            </div>
          ))}
        </div>
      ))}

      <h2>Specific Category Test</h2>
      {categoryLoading ? (
        <div>Loading specific category...</div>
      ) : categoryError ? (
        <div>Error loading category: {categoryError}</div>
      ) : category ? (
        <div style={{ padding: '10px', border: '2px solid #007bff' }}>
          <h3>{category.title}</h3>
          <p><strong>Slug ID:</strong> {category.slugId}</p>
          <p><strong>Description:</strong> {category.description}</p>
          <p><strong>Contents:</strong> {category.contents.length} items</p>
        </div>
      ) : (
        <div>Category not found</div>
      )}

      <h2>Specific Content Test</h2>
      {contentLoading ? (
        <div>Loading specific content...</div>
      ) : contentError ? (
        <div>Error loading content: {contentError}</div>
      ) : content ? (
        <div style={{ padding: '10px', border: '2px solid #28a745' }}>
          <h3>{content.name}</h3>
          <p><strong>ID:</strong> {content.id}</p>
          <p><strong>Sub Name:</strong> {content.subName}</p>
          <p><strong>Material:</strong> {content.material}</p>
          <p><strong>Thumbnail:</strong> {content.thumb ? '✅' : '❌'}</p>
          <p><strong>Detail Title:</strong> {content.detail.title}</p>
          <p><strong>Detail Description:</strong> {content.detail.description}</p>
          <p><strong>Detail Images:</strong> {content.detail.images.length} images</p>
        </div>
      ) : (
        <div>Content not found</div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e9ecef' }}>
        <h3>Debug Info</h3>
        <p><strong>Total Categories:</strong> {categories.length}</p>
        <p><strong>Categories Loading:</strong> {categoriesLoading ? 'Yes' : 'No'}</p>
        <p><strong>Categories Error:</strong> {categoriesError || 'None'}</p>
      </div>
    </div>
  );
} 