import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, startOfWeek, subDays } from 'date-fns';
import AddMealModal from '../components/planner/AddMealModal';
import ShoppingList from '../components/planner/ShoppingList';

const MealPlannerPage = () => {
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [mealPlan, setMealPlan] = useState({ plannedMeals: [] });
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ date: null, mealType: null });
    const [showShoppingList, setShowShoppingList] = useState(false);

    // ✅ Load API base URL from .env
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchMealPlan = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/meal-plan`);
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

    const handleRemoveMeal = async (plannedMealId) => {
        if (!window.confirm("Are you sure you want to remove this meal?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/meal-plan/remove/${plannedMealId}`);
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
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-blue-800 p-6">
            {isModalOpen && <AddMealModal {...modalData} onClose={() => setIsModalOpen(false)} onMealAdded={handleMealAdded} />}

            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8 drop-shadow-lg">Weekly Meal Planner</h1>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <button
                    onClick={() => setCurrentWeekStart(subDays(currentWeekStart, 7))}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
                >
                    &larr; Previous
                </button>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-200">
                    {format(currentWeekStart, 'MMM d')} - {format(addDays(currentWeekStart, 6), 'MMM d, yyyy')}
                </h2>

                <button
                    onClick={() => setCurrentWeekStart(addDays(currentWeekStart, 7))}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
                >
                    Next &rarr;
                </button>
            </div>

            <div className="text-center mb-6">
                <button
                    onClick={() => setShowShoppingList(!showShoppingList)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
                >
                    {showShoppingList ? 'Hide' : 'Generate'} Shopping List
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4">
                {days.map(day => (
                    <div key={day} className="bg-gray-800 rounded-xl shadow-xl p-4 hover:shadow-2xl transition-all duration-300">
                        <h3 className="font-bold text-center text-green-300">{format(day, 'EEE')}</h3>
                        <p className="text-sm text-center text-gray-400 mb-3">{format(day, 'd')}</p>
                        <div className="space-y-2">
                            {mealTypes.map(type => {
                                const meal = findMealForSlot(day, type);
                                return (
                                    <div key={type} className="border-t pt-2 relative">
                                        <h4 className="text-xs font-bold text-gray-500 uppercase">{type}</h4>
                                        {meal ? (
                                            <div className="text-xs relative">
                                                <button
                                                    onClick={() => handleRemoveMeal(meal.id)}
                                                    className="absolute -top-1 -right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                                                    title="Remove meal"
                                                >
                                                    &times;
                                                </button>
                                                <img src={meal.recipe.image} alt={meal.recipe.title} className="w-full h-14 md:h-20 object-cover rounded-lg mt-1" />
                                                <p className="truncate mt-1 text-gray-200 font-semibold">{meal.recipe.title}</p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleOpenModal(day, type)}
                                                className="text-xs text-green-400 hover:text-green-500 w-full text-center p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                                            >
                                                + Add Meal
                                            </button>
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
