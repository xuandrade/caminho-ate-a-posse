---
cssclass: dashboard
---

# 🎯 CENTRAL DE ESTUDOS - DEFENSORIA PÚBLICA

*Última atualização: 10/05/2025*

---

## 📅 BEM-VINDA DE VOLTA! 🌸

> [!info] 💪 Motivação
> Continue forte na sua jornada! Você está cada dia mais perto da aprovação!

---

## 🔥 REVISÕES DE HOJE

```dataview
TABLE 
    importancia as "⭐",
    materia as "📚 Matéria",
    ultima_revisao as "📅 Data"
FROM "01-Leis"
WHERE ultima_revisao = date(today)
SORT importancia DESC
```

---

## ⚠️ LEGISLAÇÃO ATUALIZADA

```dataview
TABLE 
    ano as "📆",
    importancia as "⭐"
FROM "01-Leis"
WHERE ano >= 2024
SORT ano DESC
LIMIT 10
```

---

## 📈 PROGRESSO POR MATÉRIA

```dataview
TABLE 
    length(rows) as "📚 Total"
FROM "01-Leis"
GROUP BY materia
SORT length(rows) DESC
```

---

## 🎯 METAS SEMANAIS

- [ ] Revisar 5 leis de Processo Penal
- [ ] Finalizar CPP até Art. 100
- [ ] Adicionar jurisprudência ao CPC
- [ ] Criar 20 novos flashcards

---

## 🔗 ATALHOS RÁPIDOS

- 📜 [[01-Leis/CF-1988|Constituição Federal]]
- 📜 [[01-Leis/CPP-Exemplo|Código Processo Penal]]
- 📚 [[02-Flashcards-Anki/📋 INDEX|Flashcards]]

---

**🌸 Você consegue! Rumo à aprovação!** 💜
