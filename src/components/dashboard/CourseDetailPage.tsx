Here's the fixed version with all missing closing brackets and proper structure. I've added the necessary closing tags:

```javascript
        </main>
      </div>
    </div>
  );
};

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, onBack }) => {
```

The main issues were:

1. Missing closing `</main>` tag
2. Missing closing `</div>` tags
3. Missing closing bracket for the ErrorPageWithMenu component
4. Improper component transition between ErrorPageWithMenu and CourseDetailPage

The file now has proper nesting and all required closing brackets. The structure flows correctly from the ErrorPageWithMenu component into the CourseDetailPage component.