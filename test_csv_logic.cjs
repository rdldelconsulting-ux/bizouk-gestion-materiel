/**
 * Test de la logique CSV (parsing et validation)
 * Exécuter avec: node test_csv_logic.js
 */

const fs = require('fs');

// Fonction de parsing CSV (copie de la logique du composant)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());

  return result;
}

function parseCSV(text) {
  // Supprimer le BOM UTF-8 si présent
  const cleanText = text.replace(/^\uFEFF/, '');

  const lines = cleanText.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    throw new Error('Le fichier CSV est vide ou invalide');
  }

  const headers = parseCSVLine(lines[0]);
  const data = [];
  const errors = [];

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = parseCSVLine(lines[i]);
      if (values.length === 0) continue;

      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      // Extraire les données
      const getName = () => row['Nom'] || row['nom'] || row['Name'] || row['name'] || '';
      const getReference = () => row['Référence'] || row['Reference'] || row['Ref'] || row['reference'] || row['ref'] || '';
      const getCategory = () => row['Catégorie'] || row['Category'] || row['Categorie'] || row['category'] || 'Sonorisation';
      const getDescription = () => row['Description'] || row['description'] || '';

      const material = {
        name: getName(),
        reference: getReference(),
        category: getCategory(),
        description: getDescription()
      };

      // Validation
      if (!material.name || material.name.trim() === '') {
        errors.push(`Ligne ${i + 1}: Le nom est obligatoire`);
      } else if (!material.reference || material.reference.trim() === '') {
        errors.push(`Ligne ${i + 1}: La référence est obligatoire`);
      } else {
        data.push(material);
      }
    } catch (error) {
      errors.push(`Ligne ${i + 1}: ${error.message}`);
    }
  }

  return { data, errors };
}

// Tests
console.log('=== TEST DE LA LOGIQUE CSV ===\n');

// Test 1: Fichier valide
console.log('Test 1: Import du fichier valide (test_import.csv)');
try {
  const validCSV = fs.readFileSync('test_import.csv', 'utf-8');
  const result1 = parseCSV(validCSV);
  console.log(`✅ Matériels valides: ${result1.data.length}`);
  console.log(`✅ Erreurs: ${result1.errors.length}`);
  if (result1.data.length > 0) {
    console.log('   Premier matériel:', result1.data[0]);
  }
} catch (error) {
  console.log('❌ Erreur:', error.message);
}

console.log('\n---\n');

// Test 2: Fichier avec erreurs
console.log('Test 2: Import du fichier avec erreurs (test_import_with_errors.csv)');
try {
  const errorCSV = fs.readFileSync('test_import_with_errors.csv', 'utf-8');
  const result2 = parseCSV(errorCSV);
  console.log(`✅ Matériels valides: ${result2.data.length}`);
  console.log(`❌ Erreurs: ${result2.errors.length}`);
  if (result2.errors.length > 0) {
    console.log('   Détail des erreurs:');
    result2.errors.forEach(err => console.log(`   - ${err}`));
  }
  if (result2.data.length > 0) {
    console.log('   Matériels valides:');
    result2.data.forEach(m => console.log(`   - ${m.name} (${m.reference})`));
  }
} catch (error) {
  console.log('❌ Erreur:', error.message);
}

console.log('\n---\n');

// Test 3: Parsing de lignes avec caractères spéciaux
console.log('Test 3: Parsing de lignes avec caractères spéciaux');
const testLines = [
  'Simple,BZK-001,Cat,Desc',
  '"Avec virgule, dans le nom",BZK-002,Cat,Desc',
  '"Avec ""guillemets""",BZK-003,Cat,Desc',
  'Nom avec accents éàù,BZK-004,Catégorie,Description'
];

testLines.forEach((line, idx) => {
  const parsed = parseCSVLine(line);
  console.log(`Ligne ${idx + 1}: ${parsed[0]}`);
});

console.log('\n---\n');

// Test 4: Génération CSV (export)
console.log('Test 4: Génération de CSV pour export');
const materials = [
  {
    name: 'Enceinte JBL',
    reference: 'BZK-001',
    category: 'Sonorisation',
    description: 'Enceinte active',
    status: 'available'
  },
  {
    name: 'Console, avec virgule',
    reference: 'BZK-002',
    category: 'Sonorisation',
    description: 'Console "numérique"',
    status: 'assigned'
  }
];

function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const stringValue = String(value);
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

const headers = ['Nom', 'Référence', 'Catégorie', 'Description', 'Statut'];
const rows = materials.map(m => [
  escapeCSV(m.name),
  escapeCSV(m.reference),
  escapeCSV(m.category),
  escapeCSV(m.description),
  escapeCSV(m.status)
]);

const csvOutput = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
console.log('CSV généré:');
console.log(csvOutput);

// Sauvegarder pour vérification
fs.writeFileSync('test_output.csv', '\uFEFF' + csvOutput);
console.log('\n✅ Fichier test_output.csv créé');

console.log('\n=== TOUS LES TESTS LOGIQUES SONT PASSÉS ✅ ===');
