import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const libraryFolders = [
  { id: '1', name: 'Документация', icon: 'FileText' },
  { id: '2', name: 'Шаблоны', icon: 'Layout' },
  { id: '3', name: 'Ресурсы', icon: 'Package' },
  { id: '4', name: 'Исходники', icon: 'Code' },
  { id: '5', name: 'Медиа', icon: 'Image' },
];

export default function Index() {
  const [projectNumber, setProjectNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [createdFolder, setCreatedFolder] = useState('');

  const handleFolderToggle = (folderId: string) => {
    setSelectedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleCreate = () => {
    if (!projectNumber.trim() || !clientName.trim()) {
      toast.error('Заполните все поля');
      return;
    }

    if (selectedFolders.length === 0) {
      toast.error('Выберите хотя бы одну папку из библиотеки');
      return;
    }

    setIsCreating(true);
    const folderName = `${projectNumber}-${clientName}`;

    setTimeout(() => {
      setCreatedFolder(folderName);
      setIsCreating(false);
      toast.success('Проект создан успешно!');
    }, 1500);
  };

  const handleReset = () => {
    setProjectNumber('');
    setClientName('');
    setSelectedFolders([]);
    setCreatedFolder('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-6 shadow-lg shadow-primary/20">
            <Icon name="FolderPlus" size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Организация проектов
          </h1>
          <p className="text-gray-600">
            Создайте структуру проекта за пару секунд
          </p>
        </div>

        <Card className="p-8 backdrop-blur-sm bg-white/80 shadow-2xl border-0 animate-scale-in">
          {!createdFolder ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="projectNumber" className="text-base font-medium">
                  Номер проекта
                </Label>
                <Input
                  id="projectNumber"
                  placeholder="001"
                  value={projectNumber}
                  onChange={(e) => setProjectNumber(e.target.value)}
                  className="h-12 text-base border-gray-200 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-base font-medium">
                  Название заказчика
                </Label>
                <Input
                  id="clientName"
                  placeholder="ООО Компания"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="h-12 text-base border-gray-200 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Папки из библиотеки
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {libraryFolders.map((folder) => (
                    <div
                      key={folder.id}
                      onClick={() => handleFolderToggle(folder.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${
                        selectedFolders.includes(folder.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Checkbox
                        checked={selectedFolders.includes(folder.id)}
                        className="pointer-events-none"
                      />
                      <Icon
                        name={folder.icon as any}
                        size={20}
                        className={
                          selectedFolders.includes(folder.id)
                            ? 'text-primary'
                            : 'text-gray-500'
                        }
                      />
                      <span className="font-medium text-sm">{folder.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleCreate}
                disabled={isCreating}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]"
              >
                {isCreating ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                    Создание...
                  </>
                ) : (
                  <>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Создать проект
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                <Icon name="CheckCircle2" size={48} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Проект создан!
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-lg font-mono text-gray-700 mb-4">
                  <Icon name="Folder" size={20} />
                  {createdFolder}
                </div>
                <p className="text-gray-600 mb-6">
                  Скопировано папок: {selectedFolders.length}
                </p>
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full h-12 text-base font-semibold hover:bg-gray-50"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Создать ещё проект
              </Button>
            </div>
          )}
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500 animate-fade-in">
          Утилита v1.0 · Современная организация проектов
        </div>
      </div>
    </div>
  );
}
