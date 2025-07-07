import React, { useState, useEffect } from 'react';
import { ChevronDown, X, AlertCircle } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  dataUrl: string;
  placeholder?: string;
  isClearable?: boolean;
  onChange: (selectedOption: Option | null) => void;
  value: Option | null;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  dataUrl, 
  placeholder = "Sélectionnez une option", 
  isClearable = false, 
  onChange, 
  value, 
  className = "" 
}) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (dataUrl) {
      fetchOptions();
    }
  }, [dataUrl]);

  const getFallbackOptions = (url: string): Option[] => {
    // Provide fallback options based on the URL
    if (url.includes('GetAllGrade') || url.includes('niveau')) {
      return [
        { value: 'cp', label: 'CP' },
        { value: 'ce1', label: 'CE1' },
        { value: 'ce2', label: 'CE2' },
        { value: 'cm1', label: 'CM1' },
        { value: 'cm2', label: 'CM2' },
        { value: '6eme', label: '6ème' },
        { value: '5eme', label: '5ème' },
        { value: '4eme', label: '4ème' },
        { value: '3eme', label: '3ème' },
        { value: '2nde', label: '2nde' },
        { value: '1ere', label: '1ère' },
        { value: 'terminale', label: 'Terminale' }
      ];
    }
    
    if (url.includes('GetAllVilles') || url.includes('ville')) {
      return [
        { value: 'conakry', label: 'Conakry' },
        { value: 'kankan', label: 'Kankan' },
        { value: 'labe', label: 'Labé' },
        { value: 'nzerekore', label: 'Nzérékoré' },
        { value: 'kindia', label: 'Kindia' },
        { value: 'boke', label: 'Boké' },
        { value: 'faranah', label: 'Faranah' },
        { value: 'mamou', label: 'Mamou' }
      ];
    }
    
    if (url.includes('GetAllRegions') || url.includes('region')) {
      return [
        { value: 'conakry', label: 'Conakry' },
        { value: 'boke', label: 'Boké' },
        { value: 'kindia', label: 'Kindia' },
        { value: 'mamou', label: 'Mamou' },
        { value: 'labe', label: 'Labé' },
        { value: 'faranah', label: 'Faranah' },
        { value: 'kankan', label: 'Kankan' },
        { value: 'nzerekore', label: 'Nzérékoré' }
      ];
    }
    
    // Default fallback
    return [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' }
    ];
  };

  const fetchOptions = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(dataUrl, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform API data format to expected format
      let transformedData: Option[] = [];
      if (Array.isArray(data)) {
        // Check if data uses key/value format from API
        if (data.length > 0 && data[0].key && data[0].value) {
          transformedData = data.map((item: any) => ({
            value: item.key,
            label: item.value
          }));
        } else {
          transformedData = data;
        }
      } else if (data && Array.isArray(data.data)) {
        // Check if nested data uses key/value format
        if (data.data.length > 0 && data.data[0].key && data.data[0].value) {
          transformedData = data.data.map((item: any) => ({
            value: item.key,
            label: item.value
          }));
        } else {
          transformedData = data.data;
        }
      } else {
        throw new Error('Invalid data format received from API');
      }
      
      setOptions(transformedData);
      
    } catch (error: any) {
      console.warn('API fetch failed, using fallback options:', error.message);
      setError(error.message);
      
      // Use fallback options when API fails
      const fallbackOptions = getFallbackOptions(dataUrl);
      setOptions(fallbackOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (option: Option): void => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    onChange(null);
  };

  const handleRetry = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    fetchOptions();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-full px-4 py-3 border rounded-lg bg-white cursor-pointer flex items-center justify-between focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
          error ? 'border-orange-300 bg-orange-50' : className.includes('border-slate-600') ? 'border-slate-600 bg-slate-700/50 text-white' : 'border-gray-300'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value ? value.label : placeholder}
        </span>
        <div className="flex items-center space-x-2">
          {error && (
            <AlertCircle className="h-4 w-4 text-orange-500" title="Données de secours utilisées" />
          )}
          {isClearable && value && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto ${
          className.includes('bg-slate-700') 
            ? 'bg-slate-700 border border-slate-600 text-white' 
            : 'bg-white border border-gray-300'
        }`}>
          {loading ? (
            <div className={`px-4 py-3 flex items-center space-x-2 ${
              className.includes('bg-slate-700') ? 'text-slate-300' : 'text-gray-500'
            }`}>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
              <span>Chargement...</span>
            </div>
          ) : error ? (
            <div className="px-4 py-3">
              <div className="flex items-center space-x-2 text-orange-600 text-sm mb-2">
                <AlertCircle className="h-4 w-4" />
                <span>Connexion au serveur impossible</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Données de secours utilisées
              </div>
              <button
                onClick={handleRetry}
                className="text-xs text-emerald-600 hover:text-emerald-700 underline"
              >
                Réessayer
              </button>
            </div>
          ) : options.length > 0 ? (
            options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 cursor-pointer transition-colors border-b last:border-b-0 ${
                  className.includes('bg-slate-700')
                    ? 'hover:bg-slate-600 border-slate-600 text-white'
                    : 'hover:bg-emerald-50 border-gray-100'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className={`px-4 py-3 ${
              className.includes('bg-slate-700') ? 'text-slate-300' : 'text-gray-500'
            }`}>
              Aucune option disponible
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;