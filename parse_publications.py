import csv
import json
import re

def clean_price(price_str):
    """Extract numeric value from price string"""
    # Remove $ and commas, extract the number
    match = re.search(r'[\d,]+', price_str.replace('$', '').replace(',', ''))
    if match:
        return int(match.group())
    return 0

def clean_genres(genres_str):
    """Parse genres from the CSV format"""
    # Handle special cases like "3 genres", "5 genres", etc.
    if 'genres' in genres_str.lower() and not any(char.isalpha() and char not in 'genres' for char in genres_str.lower()):
        return ["News", "Business", "Lifestyle"]  # Default genres for numbered genres
    
    # Split by common delimiters
    genres = re.split(r'[,&]', genres_str)
    genres = [g.strip() for g in genres if g.strip()]
    
    # Map common genre names to our categories
    genre_map = {
        'news': 'News',
        'business': 'Business',
        'tech': 'Tech',
        'technology': 'Tech',
        'entertainment': 'Entertainment',
        'lifestyle': 'Lifestyle',
        'music': 'Music',
        'fashion': 'Fashion',
        'sports': 'Sports',
        'luxury': 'Luxury',
        'web 3': 'Web3',
        'web3': 'Web3',
        'crypto': 'Web3',
        'health': 'Health',
        'wellness': 'Health',
        'real estate': 'Real Estate',
        'realestate': 'Real Estate',
        'culture': 'Culture',
        'art': 'Art',
        'travel': 'Travel',
        'food': 'Food'
    }
    
    mapped_genres = []
    for genre in genres:
        genre_lower = genre.lower()
        for key, value in genre_map.items():
            if key in genre_lower:
                if value not in mapped_genres:
                    mapped_genres.append(value)
                break
        else:
            # If no mapping found, capitalize the genre
            clean_genre = genre.strip()
            if clean_genre and clean_genre not in mapped_genres:
                mapped_genres.append(clean_genre)
    
    return mapped_genres if mapped_genres else ["News"]

def create_id(name):
    """Create a unique ID from publication name"""
    # Remove special characters and convert to lowercase
    id_str = re.sub(r'[^a-zA-Z0-9]', '', name.lower())
    return id_str[:20] if id_str else 'pub'

def parse_csv():
    publications = []
    
    with open('/Users/michaeldurante/Library/Application Support/com.conductor.app/uploads/originals/f2b58c61-c8f8-4b60-8777-37a194a47ba4.csv', 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            try:
                publication = {
                    'id': create_id(row['Publication']),
                    'name': row['Publication'].strip().replace('\n', ' ').replace('\r', ' ').replace('"', "'"),
                    'genres': clean_genres(row.get('Genres', 'News')),
                    'price': clean_price(row.get('Retail', '$0')),
                    'da': int(row.get('DA', 0)) if row.get('DA', '').isdigit() else 0,
                    'dr': int(row.get('DR', 0)) if row.get('DR', '').isdigit() else 0,
                    'tat': row.get('TAT', '3-5 Days').strip().replace('\n', ' ').replace('\r', ' '),
                    'region': row.get('Region', 'United States').strip().replace('\n', ', ').replace('\r', ', '),
                    'sponsored': row.get('Sponsored', 'No').lower() not in ['no', 'false', ''],
                    'indexed': row.get('Indexed', 'Yes').lower() in ['yes', 'true'],
                    'doFollow': row.get('Do follow', 'Yes').lower() in ['yes', 'true']
                }
                
                # Only add if price is valid
                if publication['price'] > 0:
                    publications.append(publication)
            except Exception as e:
                print(f"Error processing row: {row}, Error: {e}")
                continue
    
    return publications

# Parse the CSV
publications = parse_csv()

# Sort by price
publications.sort(key=lambda x: x['price'])

print(f"Parsed {len(publications)} publications")
print(f"Price range: ${min(p['price'] for p in publications)} - ${max(p['price'] for p in publications)}")

# Generate TypeScript code
ts_code = """// Auto-generated from CSV data
export interface Publication {
  id: string;
  name: string;
  genres: string[];
  price: number;
  da: number;
  dr: number;
  tat: string;
  region: string;
  sponsored: boolean;
  indexed: boolean;
  doFollow: boolean;
  favicon?: string;
}

export const publicationsData: Publication[] = [
"""

for i, pub in enumerate(publications):
    ts_code += "  {\n"
    ts_code += f'    id: "{pub["id"]}",\n'
    ts_code += f'    name: "{pub["name"]}",\n'
    ts_code += f'    genres: {json.dumps(pub["genres"])},\n'
    ts_code += f'    price: {pub["price"]},\n'
    ts_code += f'    da: {pub["da"]},\n'
    ts_code += f'    dr: {pub["dr"]},\n'
    ts_code += f'    tat: "{pub["tat"]}",\n'
    ts_code += f'    region: "{pub["region"]}",\n'
    ts_code += f'    sponsored: {str(pub["sponsored"]).lower()},\n'
    ts_code += f'    indexed: {str(pub["indexed"]).lower()},\n'
    ts_code += f'    doFollow: {str(pub["doFollow"]).lower()}\n'
    ts_code += "  }"
    if i < len(publications) - 1:
        ts_code += ","
    ts_code += "\n"

ts_code += "];\n"

# Write to file
with open('/Users/michaeldurante/wzrd ai/.conductor/inflnce2-0/lib/publications-data.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("TypeScript data file created successfully!")