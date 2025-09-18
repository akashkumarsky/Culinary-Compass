import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, startOfWeek, subDays } from 'date-fns';
import AddMealModal from '../components/planner/AddMealModal';
import ShoppingList from '../components/planner/ShoppingList'; // We will create this next

const MealPlannerPage = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [mealPlan, setMealPlan] = useState({ plannedMeals: [] });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ date: null, mealType: null });
    const [showShoppingList, setShowShoppingList] = useState(false);

    const fetchMealPlan = async () => {
        try {
            const response = await axios.get('http://localhost:8088/api/meal-plan');
            setMealPlan(response.data);
        } catch (error) {
            console.error('Failed to fetch meal plan', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchMealPlan();
    }, [currentWeekStart]);

    const handleOpenModal = (date, mealType) => {
        setModalData({ date: format(date, 'yyyy-MM-dd'), mealType });
        setIsModalOpen(true);
    };

    const handleMealAdded = (newMeal) => {
        setMealPlan(prevPlan => ({
            ...prevPlan,
            plannedMeals: [...prevPlan.plannedMeals, newMeal]
        }));
    };

    // --- NEW: Function to handle removing a meal ---
    const handleRemoveMeal = async (plannedMealId) => {
        if (!window.confirm("Are you sure you want to remove this meal?")) return;
        try {
            await axios.delete(`http://localhost:8088/api/meal-plan/remove/${plannedMealId}`);
            setMealPlan(prevPlan => ({
                ...prevPlan,
                plannedMeals: prevPlan.plannedMeals.filter(meal => meal.id !== plannedMealId)
            }));
        } catch (error) {
            console.error("Failed to remove meal", error);
            alert("Failed to remove meal.");
        }
    };

    const days = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));
    const mealTypes = ['BREAKFAST', 'LUNCH', 'DINNER'];
    const findMealForSlot = (date, mealType) => mealPlan.plannedMeals.find(
        meal => meal.mealDate === format(date, 'yyyy-MM-dd') && meal.mealType === mealType
    );

    return (
        <div>
            {isModalOpen && <AddMealModal {...modalData} onClose={() => setIsModalOpen(false)} onMealAdded={handleMealAdded} />}
            <h1 className="text-3xl font-bold mb-6 text-center">Weekly Meal Planner</h1>
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => setCurrentWeekStart(subDays(currentWeekStart, 7))} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">&larr; Previous</button>
                <h2 className="text-xl font-semibold">{format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}</h2>
                <button onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Next &rarr;</button>
            </div>
            <div className="text-center mb-4">
                <button onClick={() => setShowShoppingList(!showShoppingList)} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    {showShoppingList ? 'Hide' : 'Generate'} Shopping List
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days.map(day => (
                    <div key={day} className="border rounded-lg p-2 bg-white">
                        <h3 className="font-bold text-center">{format(day, 'EEE')}</h3>
                        <p className="text-sm text-center text-gray-500 mb-2">{format(day, 'd')}</p>
                        <div className="space-y-2">
                            {mealTypes.map(type => {
                                const meal = findMealForSlot(day, type);
                                return (
                                    <div key={type} className="border-t pt-2">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase">{type}</h4>
                                        {meal ? (
                                            <div className="text-xs relative">
                                                {/* --- NEW: The remove button --- */}
                                                <button onClick={() => handleRemoveMeal(meal.id)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold" title="Remove meal">&times;</button>
                                                <img src={meal.recipe.image} alt={meal.recipe.title} className="w-full h-12 object-cover rounded-sm" />
                                                <p className="truncate mt-1">{meal.recipe.title}</p>
                                            </div>
                                        ) : (
                                            <button onClick={() => handleOpenModal(day, type)} className="text-xs text-blue-500 hover:text-blue-700 w-full text-center p-2 rounded bg-gray-100">+ Add Meal</button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {showShoppingList && <ShoppingList weekMeals={mealPlan.plannedMeals} />}
        </div>
    );
};

export default MealPlannerPage;