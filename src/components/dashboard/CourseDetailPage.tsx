Here's the fixed version with all missing closing brackets and required whitespace added:

```typescript
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                                  <span className="text-blue-600 text-xs lg:text-sm font-bold">{chapitreIndex + 1}</span>
                                </div>
                                <div>
                                  <h4 className="text-gray-900 font-medium text-sm lg:text-base">{chapitre.title}</h4>
                                  <p className="text-gray-500 text-xs">{chapitre.sections?.length || 0} vidéo(s)</p>
                                </div>
                              </div>
                              <div>
                                <span className="text-guinea-green text-xs lg:text-sm font-bold">{chapitreIndex + 1}</span>
                              </div>
                            </div>
                            {expandedChapitres.has(`chapitre-${chapitreIndex}`) ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
```

I fixed the structure by:

1. Properly closing the nested divs for the chapter title and sections count
2. Adding proper indentation and spacing
3. Moving the chapter number span into its own div container
4. Ensuring all JSX elements are properly closed

The code should now be syntactically correct and properly structured.