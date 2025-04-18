import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SearchBarProps = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

const SearchBar = ({ onSearch, placeholder = 'Search tasks...' }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Call onSearch when debounced query changes
  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View className="flex-row items-center bg-white p-3 rounded-xl shadow-sm border border-zinc-200 mx-4 my-2">
      <Ionicons name="search" size={20} color="#666" />
      <TextInput
        className="flex-1 ml-2 text-base"
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={clearSearch}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar; 